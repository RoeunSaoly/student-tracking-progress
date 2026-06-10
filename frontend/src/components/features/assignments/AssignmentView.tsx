"use client";

import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ClipboardIcon, 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CloudArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { assignmentService, Assignment } from '../../../services/assignmentService';
import Modal from '@/components/ui/Modal';
import DialogModal from '@/components/ui/DialogModal';
import { useNavItems } from '@/hooks/useNavItems';

const AssignmentView = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navItems = useNavItems();

  // Submission modal
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Dialog modal state
  const [dialog, setDialog] = useState<{ open: boolean; type: 'success' | 'error'; title: string; message: string }>({
    open: false, type: 'error', title: '', message: ''
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await assignmentService.getMyAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Failed to fetch assignments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsSubmitModalOpen(true);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedAssignment) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('assignment_id', selectedAssignment.id);
      formData.append('file', file);

      await assignmentService.submitAssignment(formData);
      setIsSubmitModalOpen(false);
      setFile(null);
      fetchAssignments();
      setDialog({ open: true, type: 'success', title: 'Submitted!', message: 'Your assignment has been submitted successfully.' });
    } catch (error) {
      setDialog({ open: true, type: 'error', title: 'Submission Failed', message: 'Failed to submit assignment. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = assignments.filter(a => filter === 'All' || a.status === filter);

  const getDeadlineInfo = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return { label: 'LATE', color: 'text-red-600' };
    if (days === 0) return { label: 'DUE TODAY', color: 'text-orange-600' };
    return { label: `${days}d left`, color: 'text-blue-600' };
  };

  return (
    <DashboardLayout navItems={navItems} title="Student Portal">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
        <p className="text-gray-500 font-medium">Keep track of your deadlines and submissions</p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {['All', 'Pending', 'Submitted', 'Graded'].map(s => (
          <button 
            key={s} 
            onClick={() => setFilter(s)}
            className={`px-6 py-2.5 rounded-md font-bold text-xs uppercase tracking-widest transition-all
            ${filter === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-20 text-center text-gray-400 font-bold">Loading assignments...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {filtered.map((item) => {
              const deadline = getDeadlineInfo(item.due_date);
              return (
                <div key={item.id} className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center group hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4 items-start mb-4 md:mb-0">
                    <div className={`p-4 rounded-md flex-shrink-0 
                      ${item.status === 'Graded' ? 'bg-green-50 text-green-600' : 
                        item.status === 'Submitted' ? 'bg-blue-50 text-blue-600' : 
                        'bg-gray-50 text-gray-600'}`}>
                      <ClipboardIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-1">{item.class_name} • {item.max_score} Points</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                          <ClockIcon className="h-4 w-4" />
                          {new Date(item.due_date).toLocaleDateString()}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${deadline.color}`}>
                          {deadline.label}
                        </span>
                        {(item.class_is_active === 0 || item.class_is_active === false) && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            Archived
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
                    {item.status === 'Graded' ? (
                      <div className="text-right">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                          Grade: {item.grade}/{item.max_score}
                        </span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">View Feedback</p>
                      </div>
                    ) : item.status === 'Submitted' ? (
                      <div className="text-right">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                          Submitted
                        </span>
                        {(item.class_is_active !== 0 && item.class_is_active !== false) && (
                          <button 
                            onClick={() => handleSubmitClick(item)}
                            className="block text-[10px] text-gray-400 font-bold uppercase mt-2 hover:text-blue-600 text-right w-full"
                          >
                            Update File
                          </button>
                        )}
                      </div>
                    ) : (
                      (item.class_is_active !== 0 && item.class_is_active !== false) ? (
                        <button 
                          onClick={() => handleSubmitClick(item)}
                          className="w-full md:w-auto bg-gray-900 text-white px-6 py-2.5 rounded-md text-xs font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                        >
                          <CloudArrowUpIcon className="h-4 w-4" />
                          Submit
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-gray-500 uppercase">Not Submitted</span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="bg-white rounded-md p-20 text-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">No assignments found for this category</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-md p-8 text-white shadow-xl shadow-blue-200 sticky top-8">
              <h3 className="text-xl font-bold mb-6">Summary</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
                    <span>Completion Rate</span>
                    <span>{assignments.length ? Math.round((assignments.filter(a => a.status !== 'Pending').length / assignments.length) * 100) : 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000"
                      style={{ width: `${assignments.length ? (assignments.filter(a => a.status !== 'Pending').length / assignments.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-md backdrop-blur-md text-center">
                    <p className="text-2xl font-black">{assignments.filter(a => a.status === 'Pending').length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Pending</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-md backdrop-blur-md text-center">
                    <p className="text-2xl font-black">{assignments.filter(a => a.status !== 'Pending').length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      <Modal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)}
        title={`Submit: ${selectedAssignment?.title}`}
      >
        <form onSubmit={handleFileUpload} className="space-y-6">
          <div className="border-2 border-dashed border-gray-200 rounded-md p-10 text-center hover:border-blue-500 transition-colors group">
            {!file ? (
              <label className="cursor-pointer">
                <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-300 group-hover:text-blue-500 transition-colors mb-4" />
                <p className="text-sm font-bold text-gray-500">Click to upload or drag and drop</p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-black">PDF, DOCX, ZIP (MAX 10MB)</p>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-md text-white">
                    <ClipboardIcon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-blue-900 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-[10px] font-bold text-blue-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-blue-400" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="flex-1 px-6 py-3 rounded-md border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!file || submitting}
              className={`flex-1 px-6 py-3 rounded-md bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-200
                ${(!file || submitting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {submitting ? 'Submitting...' : 'Confirm Submission'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog Modal for alerts */}
      <DialogModal
        isOpen={dialog.open}
        onClose={() => setDialog(d => ({ ...d, open: false }))}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        confirmText="OK"
      />
    </DashboardLayout>
  );
};

export default AssignmentView;
