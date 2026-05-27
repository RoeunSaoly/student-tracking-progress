"use client";

import { useState } from 'react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ClipboardIcon, 
  ChatBubbleLeftRightIcon,
  UsersIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNavItems } from '@/hooks/useNavItems';

const ClassList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navItems = useNavItems();
  
  const classes = [
    { id: 1, name: "Mathematics 101", code: "MATH101", students: 32, schedule: "Mon, Wed 10:00 AM", color: "bg-blue-500" },
    { id: 2, name: "Physics Advanced", code: "PHYS302", students: 24, schedule: "Tue, Thu 02:00 PM", color: "bg-purple-500" },
    { id: 3, name: "Chemistry Basics", code: "CHEM201", students: 28, schedule: "Fri 09:00 AM", color: "bg-green-500" },
    { id: 4, name: "Computer Science", code: "CS101", students: 45, schedule: "Mon, Wed 01:00 PM", color: "bg-orange-500" },
  ];

  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout navItems={navItems} title="Instructor Portal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Classes</h1>
          <p className="text-gray-500">Manage your active classes and student enrollments</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-bold">
          <PlusIcon className="h-5 w-5" />
          Create New Class
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search classes by name or code..." 
            className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 rounded-md border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm font-medium">
            <option>All Semesters</option>
            <option>Spring 2024</option>
            <option>Fall 2023</option>
          </select>
        </div>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((item) => (
          <div key={item.id} className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className={`h-24 ${item.color} p-6 relative`}>
              <div className="absolute right-4 top-4">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                  <EllipsisVerticalIcon className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="inline-flex items-center px-2 py-1 bg-white/20 rounded-md text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                {item.code}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <AcademicCapIcon className="h-4 w-4" />
                {item.schedule}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                        S{i}
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600">
                      +{item.students - 3}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400">{item.students} Enrolled</span>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Manage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ClassList;
