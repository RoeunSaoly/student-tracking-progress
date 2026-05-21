"use client";

import { useState } from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  BellIcon,
  CircleStackIcon,
  DocumentArrowDownIcon,
  TrashIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNavItems } from '@/hooks/useNavItems';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'access' | 'security' | 'database'>('general');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [backupLoading, setBackupLoading] = useState(false);

  // General Settings state
  const [siteName, setSiteName] = useState('ST-Progress');
  const [institution, setInstitution] = useState('Central Academic University');
  const [supportEmail, setSupportEmail] = useState('support@centralacademy.edu');
  const [refreshInterval, setRefreshInterval] = useState(30); // in seconds
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Registration & Access settings state
  const [studentSelfReg, setStudentSelfReg] = useState(true);
  const [teacherVerification, setTeacherVerification] = useState(false); // require manual admin validation
  const [sessionTimeout, setSessionTimeout] = useState(60); // in minutes
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);

  // Notification and alerting settings
  const [alertOnLogin, setAlertOnLogin] = useState(true);
  const [alertOnDelete, setAlertOnDelete] = useState(true);
  const [alertOnGrading, setAlertOnGrading] = useState(false);

  const navItems = useNavItems();

  // Save changes handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Simulate database update request
    setTimeout(() => {
      setSaving(false);
      setSuccessMessage('System configuration saved successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 1200);
  };

  // Mock Database actions
  const handleDownloadBackup = () => {
    setBackupLoading(true);
    setSuccessMessage(null);
    setTimeout(() => {
      setBackupLoading(false);
      setSuccessMessage('System SQL backup compiled and downloaded successfully!');
      
      // Simulate file download trigger
      const element = document.createElement("a");
      const file = new Blob(["-- ST-Progress SQL Backup File\n-- Created: " + new Date().toISOString() + "\n\nCREATE DATABASE IF NOT EXISTS student_tracking_system;"], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `st_progress_backup_${new Date().toISOString().slice(0,10)}.sql`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 2000);
  };

  const handleClearLogs = () => {
    if (!window.confirm("CRITICAL AUDIT ACTION: Are you sure you want to clear historical activity logs? This will truncate the activity_logs database table and cannot be undone.")) {
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccessMessage('Historical activity logs successfully cleared!');
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 1500);
  };

  return (
    <DashboardLayout navItems={navItems} title="System Configuration">
      <div className="space-y-8">
        
        {/* Top Header controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">System Configuration</h1>
            <p className="text-gray-500 font-medium mt-1">Manage global preferences, self-registration controls, security policies, and backup operations.</p>
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

          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-red-50 border border-red-200 text-red-600 font-semibold rounded-md flex items-center gap-3 shadow-sm"
            >
              <div className="p-1 rounded-full bg-red-500 text-white">
                <XMarkIcon className="h-4 w-4" />
              </div>
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Tabs (bento-box style) */}
          <div className="lg:col-span-4 bg-white p-4 rounded-md border border-gray-100 shadow-sm space-y-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3.5 p-4 rounded-md font-bold text-sm transition-all duration-200 ${
                activeTab === 'general' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <GlobeAltIcon className="h-5 w-5" />
              General Branding
            </button>

            <button
              onClick={() => setActiveTab('access')}
              className={`w-full flex items-center gap-3.5 p-4 rounded-md font-bold text-sm transition-all duration-200 ${
                activeTab === 'access' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <UsersIcon className="h-5 w-5" />
              Access & Registrations
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3.5 p-4 rounded-md font-bold text-sm transition-all duration-200 ${
                activeTab === 'security' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <ShieldCheckIcon className="h-5 w-5" />
              Security & Alerts
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`w-full flex items-center gap-3.5 p-4 rounded-md font-bold text-sm transition-all duration-200 ${
                activeTab === 'database' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <CircleStackIcon className="h-5 w-5" />
              Maintenance & Backups
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="lg:col-span-8 bg-white p-8 rounded-md border border-gray-100 shadow-sm">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              {/* Tab 1: General Preferences */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">General preferences</h3>
                    <p className="text-sm text-gray-400 font-semibold mt-0.5">Control how the platform displays, labels, and updates.</p>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Site Title */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Platform Banner Title</label>
                    <input 
                      type="text" 
                      required
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-md outline-none focus:bg-white focus:border-blue-500/30 transition-all font-semibold text-sm"
                    />
                  </div>

                  {/* Institution Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Institution Label</label>
                    <input 
                      type="text" 
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-md outline-none focus:bg-white focus:border-blue-500/30 transition-all font-semibold text-sm"
                    />
                  </div>

                  {/* Support email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Help Desk Email</label>
                    <input 
                      type="email" 
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-md outline-none focus:bg-white focus:border-blue-500/30 transition-all font-semibold text-sm"
                    />
                  </div>

                  {/* Polling Interval */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Live Notifications Polling (Seconds)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min={10}
                        max={120}
                        step={5}
                        value={refreshInterval}
                        onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                        className="flex-1 h-1.5 bg-gray-100 rounded-full cursor-pointer accent-blue-600"
                      />
                      <span className="w-12 text-center text-xs font-bold text-gray-600 bg-gray-50 border px-2 py-1 rounded-md">
                        {refreshInterval}s
                      </span>
                    </div>
                  </div>

                  {/* Toggle Maintenance Mode */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100/50">
                    <div>
                      <span className="block text-xs font-bold text-gray-800 uppercase tracking-wide">System Maintenance Mode</span>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Restrict student and instructor access to update infrastructure.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={maintenanceMode}
                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Tab 2: Registrations & Access */}
              {activeTab === 'access' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Registration and Access policies</h3>
                    <p className="text-sm text-gray-400 font-semibold mt-0.5">Set validation guidelines and registration behaviors.</p>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Student self registration */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100/50">
                    <div>
                      <span className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Student Self Registration</span>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Allow public student email sign-ups.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={studentSelfReg}
                        onChange={(e) => setStudentSelfReg(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Teacher Validation */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100/50">
                    <div>
                      <span className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Automatic Teacher Validation</span>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Approve new teacher registrations automatically without manual validation.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={teacherVerification}
                        onChange={(e) => setTeacherVerification(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Session Timeout */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Token Session Expiration (Minutes)</label>
                    <input 
                      type="number" 
                      min={15}
                      max={1440}
                      required
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-md outline-none focus:bg-white focus:border-blue-500/30 transition-all font-semibold text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Security & Alerts */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Security & alerts preferences</h3>
                    <p className="text-sm text-gray-400 font-semibold mt-0.5">Control login throttle guidelines and dynamic notifications.</p>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Max Login Attempts */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Maximum Login Failures Lockout threshold</label>
                    <input 
                      type="number" 
                      min={3}
                      max={15}
                      required
                      value={maxLoginAttempts}
                      onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-md outline-none focus:bg-white focus:border-blue-500/30 transition-all font-semibold text-sm"
                    />
                  </div>

                  {/* Login Alerts Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100/50">
                    <div>
                      <span className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Generate logs on authentication</span>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Log every user login or signout attempt in audit databases.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={alertOnLogin}
                        onChange={(e) => setAlertOnLogin(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Log on Destructive */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100/50">
                    <div>
                      <span className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Generate logs on destruction</span>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Record critical user soft-deletions or class terminations.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={alertOnDelete}
                        onChange={(e) => setAlertOnDelete(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Tab 4: Database Maintenance & Operations */}
              {activeTab === 'database' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Database and backup maintenance</h3>
                    <p className="text-sm text-gray-400 font-semibold mt-0.5">Generate system backups or perform audit purging operations.</p>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Download Backup */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-50 rounded-md border border-gray-100/50 gap-4">
                    <div>
                      <span className="block text-xs font-bold text-gray-800 uppercase tracking-wide">SQL Database Backup</span>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Download structure and defaults schema backups.</p>
                    </div>
                    <button
                      type="button"
                      disabled={backupLoading}
                      onClick={handleDownloadBackup}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md shadow-blue-500/10"
                    >
                      <ArrowDownTrayIcon className={`h-4.5 w-4.5 ${backupLoading ? 'animate-bounce' : ''}`} />
                      {backupLoading ? 'Compiling SQL...' : 'Download Backup'}
                    </button>
                  </div>

                  {/* Clear Activity Logs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-red-50/50 rounded-md border border-red-100 gap-4">
                    <div>
                      <span className="block text-xs font-bold text-red-700 uppercase tracking-wide">Purge Audit Log Data</span>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Truncate historical data inside the activity_logs database table.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearLogs}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-500 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-500/10"
                    >
                      <TrashIcon className="h-4.5 w-4.5" />
                      Truncate Logs
                    </button>
                  </div>
                </div>
              )}

              {/* Submit footer button (only if not on database tab) */}
              {activeTab !== 'database' && (
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-bold text-sm transition-all disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <ArrowPathIcon className="h-4 w-4 animate-spin" />
                        Saving configurations...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
