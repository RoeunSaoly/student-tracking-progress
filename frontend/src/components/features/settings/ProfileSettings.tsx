"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CloudArrowUpIcon, 
  CheckCircleIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface ProfileData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar_url?: string;
  role: string;
}

export default function ProfileSettings() {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState<ProfileData>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    avatar_url: '',
    role: user?.role || 'student'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Alert Feedbacks
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch full user details from /users/me
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users/me');
        const data = response.data;
        setProfile({
          username: data.username || '',
          email: data.email || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          avatar_url: data.avatar_url || '',
          role: data.role || user?.role || 'student'
        });
      } catch (err) {
        console.error("Failed to load user profile settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Submit Profile Changes
  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    try {
      setSaving(true);
      setAlertMsg(null);
      
      const payload = {
        first_name: profile.first_name.trim(),
        last_name: profile.last_name.trim(),
        phone: profile.phone.trim()
      };
      
      await api.put('/users/profile', payload);
      setAlertMsg({ type: 'success', text: 'Your profile information has been saved successfully!' });
    } catch (err: any) {
      console.error(err);
      setAlertMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update profile information.' });
    } finally {
      setSaving(false);
    }
  };

  // Submit Avatar Upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setAlertMsg({ type: 'error', text: 'Image file size must be less than 10MB.' });
      return;
    }

    try {
      setUploading(true);
      setAlertMsg(null);
      
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.post('/users/avatar', formData);
      const newAvatarUrl = response.data.avatar;
      
      setProfile(prev => ({ ...prev, avatar_url: newAvatarUrl }));
      setAlertMsg({ type: 'success', text: 'Your avatar image has been uploaded and updated!' });
    } catch (err: any) {
      console.error(err);
      setAlertMsg({ type: 'error', text: err.response?.data?.message || 'Failed to upload avatar image.' });
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Role Capitalizer
  const roleDisplay = profile.role.toUpperCase();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 font-medium mt-1">Manage your personal credentials, contact details, and platform avatar profile.</p>
      </div>

      {alertMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-md flex items-center gap-3 border font-semibold text-sm shadow-sm
            ${alertMsg.type === 'success' 
              ? 'bg-green-50 border-green-100 text-green-700' 
              : 'bg-red-50 border-red-100 text-red-700'}`}
        >
          {alertMsg.type === 'success' 
            ? <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-600" />
            : <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 text-red-600" />}
          <p>{alertMsg.text}</p>
        </motion.div>
      )}

      {loading ? (
        <div className="bg-white p-10 rounded-md border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">Retrieving Profile Credentials...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile settings form (Bento 8-Span) */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-md border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-blue-600" />
              Personal Credentials
            </h3>

            <form onSubmit={handleSubmitProfile} className="space-y-6">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">First Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      type="text" 
                      name="first_name"
                      placeholder="Enter your first name"
                      value={profile.first_name}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent text-gray-700 font-semibold rounded-md outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      type="text" 
                      name="last_name"
                      placeholder="Enter your last name"
                      value={profile.last_name}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent text-gray-700 font-semibold rounded-md outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <div className="relative group">
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Enter your phone number"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent text-gray-700 font-semibold rounded-md outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure Email</label>
                  <div className="relative group opacity-65 cursor-not-allowed">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                    <input 
                      type="email" 
                      disabled
                      value={profile.email}
                      className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-transparent text-gray-400 font-bold rounded-md outline-none text-sm cursor-not-allowed"
                    />
                  </div>
                  <span className="block text-[9px] text-gray-400 font-bold tracking-tight">Your email address is managed securely by system administrators.</span>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-bold text-sm transition-all disabled:opacity-50 shadow-lg shadow-blue-500/10"
                >
                  {saving ? 'Saving...' : 'Save Profile Info'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Dynamic Bento Profile card & Avatar Uploader (Bento 4-Span) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Bento 1: Avatar Image Uploader */}
            <div className="bg-white p-6 md:p-8 rounded-md border border-gray-100 shadow-sm flex flex-col items-center space-y-4">
              <h3 className="text-base font-bold text-gray-800 self-start">Profile Image</h3>
              
              <div className="relative group w-32 h-32 rounded-md overflow-hidden shadow-inner border border-gray-100">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url.startsWith('http') ? profile.avatar_url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.avatar_url}`}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-3xl uppercase">
                    {profile.first_name ? profile.first_name.charAt(0) : profile.username.charAt(0)}
                  </div>
                )}
                
                {/* Upload Overlay */}
                <div 
                  onClick={triggerFileInput}
                  className="absolute inset-0 bg-black/60 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer gap-1"
                >
                  <CloudArrowUpIcon className="h-6 w-6 text-white animate-bounce" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Upload New</span>
                </div>
              </div>

              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={triggerFileInput}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-md hover:text-blue-600 hover:border-blue-100 transition-all font-semibold text-xs uppercase tracking-wider"
              >
                <CloudArrowUpIcon className="h-4.5 w-4.5" />
                {uploading ? 'Uploading...' : 'Choose File'}
              </button>
            </div>

            {/* Bento 2: Dynamic Live Profile Preview Card */}
            <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 p-6 rounded-md text-white shadow-xl flex flex-col justify-between h-64 relative overflow-hidden group">
              {/* Radial overlay */}
              <div className="absolute inset-0 bg-radial-gradient(ellipse at top right, rgba(99,102,241,0.15), transparent) pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <SparklesIcon className="h-8 w-8 text-indigo-400 animate-pulse" />
                <span className="px-3 py-1 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-widest backdrop-blur-md text-indigo-200 border border-white/5">
                  {roleDisplay}
                </span>
              </div>

              <div className="z-10 my-4">
                <p className="text-xl font-black truncate">
                  {profile.first_name || profile.last_name 
                    ? `${profile.first_name} ${profile.last_name}`
                    : profile.username || 'Full Name'}
                </p>
                <p className="text-xs text-gray-400 font-semibold truncate mt-0.5">@{profile.username || 'username'}</p>
                {profile.phone && (
                  <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-3">
                    <PhoneIcon className="h-3.5 w-3.5" />
                    {profile.phone}
                  </p>
                )}
              </div>

              <div className="z-10 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-4.5 w-4.5 text-green-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Authenticated</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">ST-Progress</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
