"use client";

import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import { 
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  TrashIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  title: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const DashboardLayout = ({ children, navItems, title }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const userName = user?.name || "User";

  // Notification States
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  // Fetch real notification files
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (err) {
      console.error("Failed to fetch live notifications", err);
    }
  }, [user]);

  // Handle Mark as Read
  const handleMarkAsRead = async (id: number) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  // Handle Mark All as Read
  const handleMarkAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error("Failed to mark all notifications as read", err);
    }
  };

  // Handle Delete Notification
  const handleDeleteNotification = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering markAsRead on parent click
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  // Mount, click outside listener, and live polling every 30s
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchNotifications();
      
      // Dynamic live notifications polling
      const interval = setInterval(fetchNotifications, 30000);
      
      // Close dropdown click-outside handle
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsNotificationsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        clearInterval(interval);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [user, isLoading, router, fetchNotifications]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-bold uppercase tracking-widest animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  const portalTitle = user?.role === 'teacher' ? 'Instructor Portal' : 
                      user?.role === 'student' ? 'Student Portal' : 
                      user?.role === 'admin' ? 'Admin Portal' : title;

  // Format notification time (friendly output)
  const formatTime = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Helper type icons
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'grade':
        return <AcademicCapIcon className="h-5 w-5 text-green-600" />;
      case 'assignment':
        return <ClipboardDocumentListIcon className="h-5 w-5 text-purple-600" />;
      case 'class':
        return <BookOpenIcon className="h-5 w-5 text-blue-600" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-indigo-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'grade': return 'bg-green-50';
      case 'assignment': return 'bg-purple-50';
      case 'class': return 'bg-blue-50';
      default: return 'bg-indigo-50';
    }
  };

  // Notification Dropdown Component shared by Desktop & Mobile
  const renderNotificationDropdown = () => (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-100 rounded-md shadow-2xl overflow-hidden z-50 p-2"
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-md">
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Notifications</h4>
          <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{unreadCount} unread alerts</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllAsRead}
            className="text-[10px] font-bold text-blue-600 hover:text-blue-500 uppercase tracking-wider"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-50 p-1">
        <AnimatePresence initial={false}>
          {notifications.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3 animate-pulse">
                <BellIcon className="h-6 w-6" />
              </div>
              <h5 className="font-bold text-gray-700 text-sm">Inbox is Clean!</h5>
              <p className="text-gray-400 text-xs font-semibold mt-1">You do not have any new notifications.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <motion.div 
                key={n.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => !n.is_read && handleMarkAsRead(n.id)}
                className={`p-3 rounded-md flex items-start gap-3 transition-all cursor-pointer relative group my-0.5
                  ${n.is_read ? 'hover:bg-gray-50/70' : 'bg-blue-50/30 hover:bg-blue-50/50'}`}
              >
                <div className={`p-2 rounded-md flex-shrink-0 ${getNotificationBg(n.type)}`}>
                  {getNotificationIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <p className={`text-xs ${n.is_read ? 'text-gray-600 font-medium' : 'text-gray-800 font-bold'}`}>
                    {n.title}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5 line-clamp-2">
                    {n.message}
                  </p>
                  <span className="flex items-center gap-1 text-[9px] text-gray-400 mt-1 font-bold">
                    <ClockIcon className="h-3 w-3" />
                    {formatTime(n.created_at)}
                  </span>
                </div>

                {/* Actions inside individual cards */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!n.is_read && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleMarkAsRead(n.id); }}
                      title="Mark as read"
                      className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button 
                    onClick={(e) => handleDeleteNotification(n.id, e)}
                    title="Delete alert"
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Unread blue dot */}
                {!n.is_read && (
                  <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {portalTitle}
            </h1>
          </Link>
        </div>
        <nav className="flex-1 px-4 mt-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <button
                      className={`flex items-center w-full p-3 rounded-md transition-all duration-200
                      ${isActive ? "bg-blue-600 shadow-lg shadow-blue-900/50" : "hover:bg-gray-800 text-gray-400 hover:text-white"}`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={logout}
            className="flex items-center w-full p-3 rounded-md text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all mb-4"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </button>
          
          <div className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer group">
            <UserCircleIcon className="h-10 w-10 mr-3 text-gray-400 group-hover:text-white" />
            <div className="overflow-hidden">
              <p className="font-medium truncate">{userName}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{user?.role || 'Guest'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white p-4 z-30 flex items-center justify-between">
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="h-9 w-9 bg-blue-600 hover:bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all"
        >
          {userName.charAt(0)}
        </button>
        <h1 className="text-base font-black tracking-tight">{portalTitle}</h1>
        
        {/* Mobile Live Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
            className="relative p-2"
          >
            <BellIcon className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-gray-900 animate-pulse"></span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-3 mr-[-10px] z-50">
                {renderNotificationDropdown()}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Sleek Glassmorphism look) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-gray-100 z-30 flex items-center justify-around px-2 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="flex-1">
              <button
                className={`flex flex-col items-center justify-center w-full h-full py-1 text-[9px] font-black tracking-wider transition-all duration-200
                ${isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <div className="relative">
                  <item.icon className={`h-5.5 w-5.5 mb-0.5 transition-transform duration-300 ${isActive ? "scale-110 text-blue-600" : ""}`} />
                  {isActive && (
                    <motion.div 
                      layoutId="bottomNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                    />
                  )}
                </div>
                <span className="truncate max-w-[64px] font-sans mt-0.5">{item.name}</span>
              </button>
            </Link>
          );
        })}
      </div>

      {/* Mobile Sidebar Overlay (For profile metadata and log out only) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-gray-900 text-white p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center font-bold text-sm shadow-md">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{userName}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user?.role}</p>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-gray-850 rounded-md">
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Account Details & Info
                <div className="bg-gray-950 p-4 rounded-md border border-gray-850 space-y-2 mt-2">
                  <p className="text-[10px] text-gray-500 lowercase tracking-normal">Logged Email:</p>
                  <p className="text-xs text-gray-300 font-bold truncate tracking-normal">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                className="flex items-center w-full p-3.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-md transition-all border border-red-900/10"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
                <span className="font-bold text-sm">Sign Out Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header */}
        <header className="hidden md:flex h-16 bg-white border-b items-center justify-between px-8 sticky top-0 z-20">
          <h2 className="text-lg font-semibold text-gray-800">
            {portalTitle}
          </h2>
          <div className="flex items-center space-x-6">
            
            {/* Live Notification Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && renderNotificationDropdown()}
              </AnimatePresence>
            </div>

            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{user?.role || 'Online'}</p>
              </div>
              <div className="h-9 w-9 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                {userName.charAt(0)}
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content with Mobile clearing bottom nav padding */}
        <main className="flex-1 p-4 md:p-8 mt-16 pb-24 md:pb-8 md:mt-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
