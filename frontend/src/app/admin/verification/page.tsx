"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  AcademicCapIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNavItems } from '@/hooks/useNavItems';
import api from '@/lib/axios';
import { motion, AnimatePresence } from 'framer-motion';

interface TeacherPending {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export default function TeacherVerificationPage() {
  const [pendingTeachers, setPendingTeachers] = useState<TeacherPending[]>([]);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actioningId, setActioningId] = useState<number | null>(null);
  const navItems = useNavItems();

  const fetchPendingTeachers = useCallback(async () => {
    try {
      setPendingLoading(true);
      const response = await api.get('/admin/teachers/pending');
      setPendingTeachers(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch pending validation list');
    } finally {
      setPendingLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingTeachers();
  }, [fetchPendingTeachers]);

  const handleApproveTeacher = async (id: number) => {
    try {
      setActioningId(id);
      setError(null);
      const response = await api.put(`/admin/teachers/${id}/approve`);
      setSuccessMessage(response.data.message || 'Teacher approved successfully!');
      setPendingTeachers(prev => prev.filter(t => t.id !== id));
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to approve teacher');
    } finally {
      setActioningId(null);
    }
  };

  const handleRejectTeacher = async (id: number) => {
    if (!window.confirm("Are you sure you want to reject and delete this registration request?")) {
      return;
    }
    try {
      setActioningId(id);
      setError(null);
      const response = await api.put(`/admin/teachers/${id}/reject`);
      setSuccessMessage(response.data.message || 'Teacher request rejected and removed.');
      setPendingTeachers(prev => prev.filter(t => t.id !== id));
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reject teacher');
    } finally {
      setActioningId(null);
    }
  };

  return (
    <DashboardLayout navItems={navItems} title="Teacher Verification">
      <div className="space-y-8">
        
        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">Teacher Verification</h1>
            <p className="text-gray-500 font-medium mt-1">Review and approve pending instructor registrations for the platform.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchPendingTeachers}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-md hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50/50 transition-all font-semibold text-sm shadow-sm"
            >
              <ArrowPathIcon className={`h-4 w-4 ${pendingLoading ? 'animate-spin' : ''}`} />
              Refresh Queue
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        <AnimatePresence>
          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-green-50 border border-green-200 text-green-700 font-semibold rounded-md flex items-center gap-3 shadow-sm"
            >
              <div className="p-1 rounded-full bg-green-500 text-white">
                <CheckIcon className="h-4 w-4" />
              </div>
              {successMessage}
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-red-50 border border-red-200 text-red-600 font-semibold rounded-md flex items-center gap-3 shadow-sm"
            >
              <div className="p-1 rounded-full bg-red-500 text-white">
                <XMarkIcon className="h-4 w-4" />
              </div>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pending Approval Queue */}
        <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                <AcademicCapIcon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Pending Instructor Registrations</h2>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              {pendingTeachers.length} Waiting
            </span>
          </div>

          <div className="p-6 flex-1">
            {pendingLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-100 rounded-md gap-4 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-gray-100"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-100 rounded-md"></div>
                        <div className="h-3 w-48 bg-gray-100 rounded-md"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-10 w-24 bg-gray-100 rounded-md"></div>
                      <div className="h-10 w-24 bg-gray-100 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : pendingTeachers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center h-full min-h-[40vh]">
                <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 shadow-inner">
                  <ShieldCheckIcon className="h-10 w-10 text-blue-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">All Caught Up!</h3>
                <p className="text-gray-500 max-w-sm font-medium mt-2">There are currently no pending teacher registrations awaiting validation.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {pendingTeachers.map((teacher) => (
                    <motion.div
                      key={teacher.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="group flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/5 rounded-md gap-4 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-start md:items-center gap-4">
                        <div className="h-12 w-12 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-md flex items-center justify-center font-bold shadow-md shadow-blue-500/10 text-lg">
                          {teacher.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                            {teacher.username}
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider">Teacher</span>
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5">
                              <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                              {teacher.email}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                              Registered: {new Date(teacher.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleRejectTeacher(teacher.id)}
                          disabled={actioningId !== null}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-md hover:bg-red-50/60 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                        >
                          <XMarkIcon className="h-4 w-4" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveTeacher(teacher.id)}
                          disabled={actioningId !== null}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 active:scale-[0.98] font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md shadow-blue-500/10"
                        >
                          <CheckIcon className="h-4 w-4" />
                          Approve
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
