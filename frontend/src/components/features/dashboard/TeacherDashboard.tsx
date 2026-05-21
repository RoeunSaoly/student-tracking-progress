"use client";

import { useState } from 'react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ClipboardIcon, 
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  PlusIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import Card from '@/components/ui/Card';
import PerformanceCircle from '@/components/dashboard/PerformanceCircle';
import ActivityLog from '@/components/dashboard/ActivityLog';
import Badge from '@/components/ui/Badge';
import { LoadingState, ErrorState } from '@/components/ui/FeedbackStates';
import { useDashboard } from '@/hooks/useDashboard';
import { useNavItems } from '@/hooks/useNavItems';

import CreateClassModal from '@/components/features/classes/CreateClassModal';
import CreateAssignmentModal from '@/components/features/assignments/CreateAssignmentModal';

const TeacherDashboard = () => {
  const { data, loading, error, refresh } = useDashboard('teacher');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const navItems = useNavItems();

  if (loading && !data) return (
    <DashboardLayout navItems={navItems} title="Instructor Portal">
      <LoadingState message="Loading analytics..." />
    </DashboardLayout>
  );

  if (error) return (
    <DashboardLayout navItems={navItems} title="Instructor Portal">
      <ErrorState error={error} onRetry={refresh} />
    </DashboardLayout>
  );

  const stats = [
    { label: "Total Students", value: data?.stats?.totalStudents || 0, icon: UsersIcon, color: "bg-gray-100", textColor: "text-gray-700", bgColor: "bg-white" },
    { label: "Active Classes", value: data?.stats?.totalClasses || 0, icon: AcademicCapIcon, color: "bg-gray-100", textColor: "text-gray-700", bgColor: "bg-white" },
    { label: "Assignments", value: data?.stats?.totalAssignments || 0, icon: DocumentTextIcon, color: "bg-gray-100", textColor: "text-gray-700", bgColor: "bg-white" },
    { label: "Avg. Score", value: data?.stats?.averageGrade !== "0.00" ? `${data.stats.averageGrade}%` : "N/A", icon: ArrowTrendingUpIcon, color: "bg-gray-100", textColor: "text-gray-700", bgColor: "bg-white" },
    { label: "Sub. Rate", value: `${data?.stats?.submissionRate || 0}%`, icon: ArrowTrendingUpIcon, color: "bg-gray-100", textColor: "text-gray-700", bgColor: "bg-white" },
  ];

  const filteredStudents = selectedClassId === 'all' 
    ? data?.studentPerformance 
    : data?.studentPerformance?.filter((s: any) => s.class_id.toString() === selectedClassId);

  return (
    <DashboardLayout navItems={navItems} title="Instructor Portal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card title="Student Performance" headerAction={
            <select 
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all shadow-sm"
            >
              <option value="all">All Students</option>
              {data?.classes?.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          }>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 font-semibold text-gray-500 uppercase text-xs">Student</th>
                    <th className="pb-3 font-semibold text-gray-500 uppercase text-xs text-center">Avg. Grade</th>
                    <th className="pb-3 font-semibold text-gray-500 uppercase text-xs text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredStudents?.map((student: any) => (
                    <tr key={student.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm">
                            {student.username[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{student.username}</p>
                            <p className="text-xs text-gray-500">{student.class_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className="font-semibold text-gray-900">{student.average_grade}%</span>
                      </td>
                      <td className="py-4 text-right">
                        <Badge variant={parseFloat(student.average_grade) >= 50 ? 'success' : 'error'}>
                          {parseFloat(student.average_grade) >= 50 ? 'Passing' : 'At Risk'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card title="Quick Actions">
             <div className="grid grid-cols-1 gap-3">
               <button onClick={() => setShowCreateClass(true)} className="flex items-center justify-between p-4 rounded-md border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-all shadow-sm group">
                 <span className="font-medium text-sm">Create Class</span>
                 <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
               </button>
               <button onClick={() => setShowCreateAssignment(true)} className="flex items-center justify-between p-4 rounded-md border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-all shadow-sm group">
                 <span className="font-medium text-sm">Create Assignment</span>
                 <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
               </button>
             </div>
          </Card>

          <Card variant="dark" title="Submission Rate">
            <PerformanceCircle 
              percentage={parseFloat(data?.stats?.submissionRate) || 0} 
              sublabel={`Student engagement across ${data?.stats?.totalClasses} active classes`}
            />
          </Card>
        </div>
      </div>

      <CreateClassModal isOpen={showCreateClass} onClose={() => setShowCreateClass(false)} onSuccess={refresh} />
      <CreateAssignmentModal isOpen={showCreateAssignment} onClose={() => setShowCreateAssignment(false)} onSuccess={refresh} />
    </DashboardLayout>
  );
};

export default TeacherDashboard;
