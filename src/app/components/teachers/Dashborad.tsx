// components/Dashboard.jsx
"use client";

import { useState } from 'react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ClipboardIcon, 
  ChatBubbleLeftRightIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CheckBadgeIcon,


} from '@heroicons/react/24/outline';
import Link  from 'next/link';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const [newGoal, setNewGoal] = useState({ title: "", target: "", type: "grade" });
  const [showAddGoal, setShowAddGoal] = useState(false);

  const navItems = [
    { name: 'Home', icon: HomeIcon},
    { name: 'Classes', icon: BookOpenIcon},
    { name: 'Assignments', icon: ClipboardIcon },
    { name: 'Messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Student', icon: UserCircleIcon },
  ];

  const courses = [
    { name: "Mathematics 101", instructor: "Dr. Sarah Johnson", progress: 75 },
    { name: "Physics Advanced", instructor: "Prof. Michael Chen", progress: 60 },
    { name: "Chemistry Basics", instructor: "Dr. Emily Davis", progress: 85 },
    { name: "Computer Science", instructor: "Prof. James Wilson", progress: 90 },
  ];

  const announcements = [
    { title: "Midterm Exam Schedule", description: "The midterm exam will be held on December 13th", time: "2 hours ago" },
    { title: "Lab Session Cancelled", description: "Tomorrow's lab is cancelled.", time: "2 days ago" },
    { title: "New Study Materials", description: "Additional practice problems uploaded.", time: "3 days ago" },
  ];

  // Updated stats with icons and colors
  const stats = [
    { 
      label: "Active Classes", 
      value: "4", 
      icon: AcademicCapIcon, 
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      label: "Assignments", 
      value: "12", 
      icon: DocumentTextIcon, 
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    { 
      label: "Avg. Grade", 
      value: "77.5%", 
      icon: ChartBarIcon, 
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      label: "Completed", 
      value: "28/35", 
      icon: CheckBadgeIcon, 
      color: "bg-orange-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50"
    },
  ];


  const getProgressColor = (progress:number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    return "bg-yellow-500";
  };

  const getGoalProgressColor = (current:number, target:number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-blue-500";
    return "bg-yellow-500";
  };

 const getGoalIcon = (type: "grade" | "assignment" | "hours"): string => {
  switch (type) {
    case "grade":
      return "🎯";
    case "assignment":
      return "📝";
    case "hours":
      return "⏱️";
    default:
      return "🎯";
  }
};

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        </div>
        <nav className="flex-1 px-4">
            <ul className="space-y-2">
            {navItems.map((item) => (
            <li key={item.name}>
                {item.href ? (
                <Link href={item.href}>
                <button
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors
                    ${activeTab === item.name ? "bg-blue-600" : "hover:bg-gray-800"}`}
                >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                </button>
                </Link>
                ) : (
                <button
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors
                    ${activeTab === item.name ? "bg-blue-600" : "hover:bg-gray-800"}`}
                >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                </button>
                )}
            </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <UserCircleIcon className="h-10 w-10 mr-3" />
            <div>
              <p className="font-medium">Teacher Name</p>
              <p className="text-sm text-gray-400">View Profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Teacher Dashboard</h1>
        <button className="p-2">
          <BellIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-2 z-10">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center p-2 ${activeTab === item.name ? 'text-blue-400' : ''}`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href='/'> <h2 className="text-2xl font-bold text-gray-800">Home</h2></Link>
          <div className="flex items-center space-x-4">
            <button className="relative p-2">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center">
              <UserCircleIcon className="h-8 w-8 text-gray-600 mr-2" />
              <ChevronDownIcon className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Dashboard;