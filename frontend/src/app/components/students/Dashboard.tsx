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
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  XMarkIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import Link  from 'next/link';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [goals, setGoals] = useState([
    { id: 1, title: "Achieve 90% in Mathematics", current: 75, target: 90, type: "grade" },
    { id: 2, title: "Complete all Physics assignments", current: 8, target: 12, type: "assignment" },
    { id: 3, title: "Study 20 hours this week", current: 17, target: 20, type: "hours" },
  ]);
  const [newGoal, setNewGoal] = useState({ title: "", target: "", type: "grade" });
  const [showAddGoal, setShowAddGoal] = useState(false);

  const navItems = [
    { name: 'Home', icon: HomeIcon},
    { name: 'My Classes',href:'../../student/myclasses/page', icon: BookOpenIcon},
    { name: 'Assignments', icon: ClipboardIcon },
    { name: 'Messages', icon: ChatBubbleLeftRightIcon },
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

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target) {
      const newGoalObj = {
        id: goals.length + 1,
        title: newGoal.title,
        current: 0,
        target: parseInt(newGoal.target),
        type: newGoal.type
      };
      setGoals([...goals, newGoalObj]);
      setNewGoal({ title: "", target: "", type: "grade" });
      setShowAddGoal(false);
    }
  };

  const handleRemoveGoal = ( id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

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
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
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
              <p className="font-medium">Student Name</p>
              <p className="text-sm text-gray-400">View Profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Student Dashboard</h1>
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

        {/* Stats Grid - Updated with Icons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`${stat.bgColor} rounded-xl shadow p-5 border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className={`h-2 w-2 rounded-full ${stat.color}`}></div>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                {stat.label === "Avg. Grade" && (
                  <span className={`ml-2 text-sm font-medium px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                    Good
                  </span>
                )}
                {stat.label === "Completed" && (
                  <span className="ml-2 text-sm text-gray-500">
                    (80%)
                  </span>
                )}
              </div>
              
              {/* Progress bar for Completed stat */}
              {stat.label === "Completed" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Trend indicator for Avg. Grade */}
              {stat.label === "Avg. Grade" && (
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-green-600 font-medium">
                    ↑ 2.5% from last month
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Alternative Stats Grid Design (Simple Version) */}
        {false && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor} mr-3`}>
                    <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Course Progress */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">All Courses Progress</h3>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.name} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between mb-1">
                      <div>
                        <h4 className="font-medium text-gray-800">{course.name}</h4>
                        <p className="text-sm text-gray-500">{course.instructor}</p>
                      </div>
                      <span className="font-bold text-gray-800">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Announcements</h3>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                    <p className="text-gray-600 mt-1">{announcement.description}</p>
                    <p className="text-sm text-gray-400 mt-2">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Course Progress Summary */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Course Progress</h3>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset="251.2 - (251.2 * 77.5) / 100"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-3xl font-bold text-gray-800">77.5%</span>
                    <p className="text-gray-500">Total</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-bold text-gray-800">28</span>
                  </div>
                  <p className="text-gray-500 text-sm">Completed</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-bold text-gray-800">7</span>
                  </div>
                  <p className="text-gray-500 text-sm">In Progress</p>
                </div>
              </div>
            </div>

            {/* Study Goals */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">My Study Goals</h3>
                <button 
                  onClick={() => setShowAddGoal(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Goal
                </button>
              </div>

              {/* Add Goal Form */}
              {showAddGoal && (
                <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">New Goal</h4>
                    <button onClick={() => setShowAddGoal(false)}>
                      <XMarkIcon className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Goal title"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    />
                    <input
                      type="number"
                      placeholder="Target value"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    />
                    <div className="flex space-x-2">
                      {["grade", "assignment", "hours"].map(type => (
                        <button
                          key={type}
                          className={`px-3 py-1 rounded text-sm ${newGoal.type === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                          onClick={() => setNewGoal({...newGoal, type})}
                        >
                          {type === "grade" && "Grade Goal"}
                          {type === "assignment" && "Assignment"}
                          {type === "hours" && "Study Hours"}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleAddGoal}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Add Goal
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {goals.map((goal) => {
                  const percentage = Math.min((goal.current / goal.target) * 100, 100);
                  return (
                    <div key={goal.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="mr-2">{getGoalIcon(goal.type as "grade" | "assignment" | "hours")}</span>
                          <h4 className="font-medium text-gray-800">{goal.title}</h4>
                        </div>
                        <button 
                          onClick={() => handleRemoveGoal(goal.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{goal.type === "grade" ? `${goal.current}% / ${goal.target}%` : 
                               goal.type === "assignment" ? `${goal.current} / ${goal.target} assignments` :
                               `${goal.current} / ${goal.target} hours`}</span>
                        <span>{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${getGoalProgressColor(goal.current, goal.target)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;