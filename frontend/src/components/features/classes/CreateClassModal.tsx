"use client";

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import api from '@/lib/axios';

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateClassModal = ({ isOpen, onClose, onSuccess }: CreateClassModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      setLoading(true);
      setError('');
      await api.post('/classes', formData);
      onSuccess();
      onClose();
      setFormData({ name: '', description: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Class">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Class Name</label>
          <input
            type="text"
            required
            className="w-full px-5 py-4 rounded-md bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800 font-medium"
            placeholder="e.g. Advanced Mathematics"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Description (Optional)</label>
          <textarea
            className="w-full px-5 py-4 rounded-md bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800 font-medium min-h-[120px]"
            placeholder="What will students learn in this class?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-md bg-blue-600 text-white font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Creating...' : 'Create Class'}
        </button>
      </form>
    </Modal>
  );
};

export default CreateClassModal;
