"use client";

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { assignmentService } from '../../../services/assignmentService';
import { classService } from '../../../services/classService';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultClassId?: string;
}

const CreateAssignmentModal = ({ isOpen, onClose, onSuccess, defaultClassId }: CreateAssignmentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    max_score: 100,
    class_id: defaultClassId || ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchClasses();
    }
  }, [isOpen]);

  const fetchClasses = async () => {
    try {
      const classesData = await classService.getTeacherClasses();
      setClasses(classesData);
      if (defaultClassId) {
        setFormData(prev => ({ ...prev, class_id: defaultClassId }));
      } else if (classesData.length > 0 && !formData.class_id) {
        setFormData(prev => ({ ...prev, class_id: classesData[0].id }));
      }
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.class_id || !formData.due_date) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await assignmentService.createAssignment(formData);
      onSuccess();
      onClose();
      setFormData({
        title: '',
        description: '',
        due_date: '',
        max_score: 100,
        class_id: defaultClassId || classes[0]?.id || ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Assignment">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Select Class</label>
          <select 
            className="w-full px-5 py-4 rounded-md bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            value={formData.class_id}
            onChange={(e) => setFormData({...formData, class_id: e.target.value})}
            required
            disabled={!!defaultClassId}
          >
            <option value="" disabled>Choose a class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Assignment Title</label>
          <input 
            type="text" 
            className="w-full px-5 py-4 rounded-md bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800 font-medium"
            placeholder="e.g. Weekly Quiz #1"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
          <textarea 
            className="w-full px-5 py-4 rounded-md bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800 font-medium min-h-[100px]"
            placeholder="What should students do?"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Due Date</label>
            <input 
              type="date" 
              className="w-full px-5 py-4 rounded-md bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800 font-medium"
              value={formData.due_date}
              onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Max Score</label>
            <input 
              type="number" 
              className="w-full px-5 py-4 rounded-md bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800 font-medium"
              value={formData.max_score}
              onChange={(e) => setFormData({...formData, max_score: parseInt(e.target.value)})}
              required
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 rounded-md border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 py-4 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Assignment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAssignmentModal;
