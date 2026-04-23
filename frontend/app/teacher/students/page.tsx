import React from 'react';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Users, 
  Search,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

// Mock data extracted from the design
const studentData = [
  { id: 1, name: 'Sarah Chen', class: 'Algebra II', grade: 94, trend: 'up', assignments: '18/20', attendance: '98%' },
  { id: 2, name: 'Michael Johnson', class: 'Geometry', grade: 87, trend: 'up', assignments: '19/20', attendance: '95%' },
  { id: 3, name: 'Emily Rodriguez', class: 'Pre-Calculus', grade: 91, trend: 'flat', assignments: '17/20', attendance: '100%' },
  { id: 4, name: 'John Davis', class: 'Statistics', grade: 78, trend: 'down', assignments: '14/20', attendance: '88%' },
  { id: 5, name: 'Amanda Lee', class: 'Calculus AP', grade: 96, trend: 'up', assignments: '20/20', attendance: '100%' },
  { id: 6, name: 'David Martinez', class: 'Algebra II', grade: 82, trend: 'flat', assignments: '16/20', attendance: '92%' },
  { id: 7, name: 'Jessica Taylor', class: 'Geometry', grade: 89, trend: 'up', assignments: '18/20', attendance: '96%' },
  { id: 8, name: 'Ryan Anderson', class: 'Statistics', grade: 73, trend: 'down', assignments: '12/20', attendance: '85%' },
  { id: 9, name: 'Olivia Brown', class: 'Pre-Calculus', grade: 92, trend: 'flat', assignments: '19/20', attendance: '98%' },
  { id: 10, name: 'Ethan Wilson', class: 'Advanced Math', grade: 88, trend: 'up', assignments: '17/20', attendance: '94%' },
];

// Helper functions for dynamic styling
const getGradeColor = (grade: number) => {
  if (grade >= 90) return 'bg-green-100 text-green-600';
  if (grade >= 80) return 'bg-blue-100 text-blue-600';
  return 'bg-yellow-100 text-yellow-600';
};

const getTrendIcon = (trend: string) => {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
};

export default function StudentProgressDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          
          {/* Header */}
          <h1 className="text-xl font-semibold text-gray-800 mb-6">Student Progress</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search students..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="w-32 border border-gray-200 rounded-lg"></div> {/* Placeholder for secondary action/filter button shown in design */}
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-4 font-semibold">Student Name</th>
                  <th className="py-4 px-4 font-semibold">Class</th>
                  <th className="py-4 px-4 font-semibold text-center">Current Grade</th>
                  <th className="py-4 px-4 font-semibold text-center">Trend</th>
                  <th className="py-4 px-4 font-semibold text-center">Assignments</th>
                  <th className="py-4 px-4 font-semibold text-center">Attendance</th>
                  <th className="py-4 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {studentData.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-800">{student.name}</td>
                    <td className="py-4 px-4 text-gray-500">{student.class}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getGradeColor(student.grade)}`}>
                          {student.grade}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        {getTrendIcon(student.trend)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">{student.assignments}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{student.attendance}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>

    </div>
  );
}