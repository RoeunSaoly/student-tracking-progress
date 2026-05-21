"use client";

import { AcademicCapIcon, UserIcon, ClipboardDocumentListIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ClassCardProps {
  id: number;
  name: string;
  teacher_name?: string;
  student_count?: number;
  total_assignments?: number;
  completed_assignments?: number;
  role: 'teacher' | 'student';
  code?: string;
}

const ClassCard = ({ id, name, teacher_name, student_count, total_assignments, completed_assignments, role, code }: ClassCardProps) => {
  const progress = total_assignments && total_assignments > 0 
    ? Math.round(((completed_assignments || 0) / total_assignments) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-md p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-blue-50 rounded-md group-hover:bg-blue-600 transition-colors duration-300">
          <AcademicCapIcon className="h-6 w-6 text-blue-600 group-hover:text-white" />
        </div>
        {role === 'teacher' && code && (
          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Class Code</span>
            <span className="bg-gray-900 text-white px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider">{code}</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{name}</h3>
      <p className="text-sm text-gray-500 font-medium mb-6">
        {role === 'teacher' ? (
          <span className="flex items-center gap-1.5">
            <UserIcon className="h-4 w-4" />
            {student_count || 0} Students enrolled
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <UserIcon className="h-4 w-4" />
            Instructor: {teacher_name}
          </span>
        )}
      </p>

      {role === 'student' && (
        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-tighter">
            <span>Progress</span>
            <span className="text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
            {completed_assignments || 0} / {total_assignments || 0} Assignments Completed
          </p>
        </div>
      )}

      {role === 'teacher' && (
        <div className="flex gap-4 mb-6">
          <div className="flex-1 p-3 bg-gray-50 rounded-md">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Students</p>
            <p className="text-lg font-bold text-gray-800">{student_count || 0}</p>
          </div>
          <div className="flex-1 p-3 bg-gray-50 rounded-md">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tasks</p>
            <p className="text-lg font-bold text-gray-800">{total_assignments || 0}</p>
          </div>
        </div>
      )}

      <Link href={`/classes/${id}`}>
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-gray-900 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-gray-200">
          View Details
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </Link>
    </div>
  );
};

export default ClassCard;
