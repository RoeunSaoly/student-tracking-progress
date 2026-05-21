"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  UsersIcon, 
  AcademicCapIcon, 
  ServerIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNavItems } from '@/hooks/useNavItems';
import api from '@/lib/axios';
import ActivityLog from '@/components/dashboard/ActivityLog';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navItems = useNavItems();

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard/admin');
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading && !data) {
    return (
      <DashboardLayout navItems={navItems} title="System Overview">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 mb-4"></div>
          <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest">Initialising Admin Panel...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Example structured stats based on actual data
  const stats = [
    { label: "Total Users", value: data?.stats?.total_users || 0, icon: UsersIcon, trend: "+12%" },
    { label: "Total Teachers", value: data?.stats?.total_teachers || 0, icon: AcademicCapIcon, trend: "+5%" },
    { label: "Active Classes", value: data?.stats?.total_classes || 0, icon: ServerIcon, trend: "+3%" },
    { label: "Pending Verification", value: data?.stats?.pending_teachers || 0, icon: ShieldCheckIcon, alert: data?.stats?.pending_teachers > 0 },
  ];

  return (
    <DashboardLayout navItems={navItems} title="System Overview">
      
      {/* 1. TOP ACTION BAR (Search, Notifications, Actions) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users, classes, or settings..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <BellIcon className="h-6 w-6" />
            {(data?.stats?.pending_teachers > 0) && (
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export System Report
          </button>
        </div>
      </div>

      {/* 2. STATS GRID WITH TRENDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-md shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                <stat.icon className="h-5 w-5 text-gray-700" />
              </div>
              {stat.trend && (
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              )}
              {stat.alert && (
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full animate-pulse">
                  Action Needed
                </span>
              )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Analytics Chart Placeholder & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Analytics Chart Container */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 h-80 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Platform Engagement</h3>
              <select className="text-sm border-gray-200 rounded-md text-gray-600 focus:ring-gray-900 bg-white p-2 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex-1 border-2 border-dashed border-gray-100 rounded-md flex items-center justify-center text-gray-400 bg-gray-50/50 text-sm font-medium">
              [ Revenue / Growth Chart Area ]
            </div>
          </div>

          <ActivityLog 
            activities={data?.recentActivities} 
            loading={loading} 
            onRefresh={fetchDashboardData}
          />
        </div>

        {/* Right Column: Pending Actions & System Health */}
        <div className="space-y-8">
          
          {/* Action Queue Component */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Queue</h3>
            
            <div className="space-y-3">
              {data?.stats?.pending_teachers > 0 ? (
                <>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">Pending Teachers</span>
                      <span className="text-xs text-gray-500">{data?.stats?.pending_teachers} require approval</span>
                    </div>
                    <button className="text-xs font-medium text-gray-900 bg-white border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50">
                      Review
                    </button>
                  </div>
                  <button className="w-full mt-2 text-sm text-gray-500 font-medium hover:text-gray-900 transition-colors py-2">
                    View all pending ({data?.stats?.pending_teachers}) &rarr;
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <ShieldCheckIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">No pending verifications</p>
                </div>
              )}
            </div>
          </div>

          {/* System Status Component */}
          <div className="bg-gray-900 rounded-md shadow-sm border border-gray-800 p-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold tracking-tight">System Status</h3>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                  <span>Database Load</span>
                  <span className="text-white">24%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                  <span>Storage Capacity</span>
                  <span className="text-white">78%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-gray-300 h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
