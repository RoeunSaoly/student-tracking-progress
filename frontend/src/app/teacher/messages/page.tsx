"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ClipboardIcon, 
  UsersIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNavItems } from '@/hooks/useNavItems';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface StudentContact {
  id: number;
  username: string;
  email: string;
  class_name: string;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
  sender_name?: string;
  receiver_name?: string;
}

export default function TeacherMessagesPage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<StudentContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<StudentContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Loading & search states
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const navItems = useNavItems();

  // Fetch students enrolled in teacher's classes
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoadingContacts(true);
        const response = await api.get('/students/my-students');
        // Filter out duplicate students that might appear across multiple classes
        const uniqueContacts: StudentContact[] = [];
        const seenIds = new Set();
        response.data.forEach((student: StudentContact) => {
          if (!seenIds.has(student.id)) {
            seenIds.add(student.id);
            uniqueContacts.push(student);
          }
        });
        setContacts(uniqueContacts);
      } catch (err) {
        console.error("Failed to load contacts", err);
      } finally {
        setLoadingContacts(false);
      }
    };
    fetchContacts();
  }, []);

  // Fetch conversation with a specific student
  const fetchConversation = useCallback(async (studentId: number, silent = false) => {
    try {
      if (!silent) setLoadingMessages(true);
      const response = await api.get(`/messages/${studentId}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to fetch conversation history", err);
    } finally {
      if (!silent) setLoadingMessages(false);
    }
  }, []);

  // Set up conversation polling when a student is selected
  useEffect(() => {
    if (!selectedContact) return;
    
    fetchConversation(selectedContact.id);

    // Dynamic messaging polling (every 4 seconds)
    const interval = setInterval(() => {
      fetchConversation(selectedContact.id, true);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedContact, fetchConversation]);

  // Scroll to bottom of conversation feed
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send Direct Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact || sendingMessage) return;

    try {
      setSendingMessage(true);
      const payload = {
        receiver_id: selectedContact.id,
        content: newMessage.trim()
      };
      
      const response = await api.post('/messages', payload);
      
      // Instantly append to state for immediate UI feedback
      const localMsg: Message = {
        id: response.data.messageId || Date.now(),
        sender_id: user?.id || 0,
        receiver_id: selectedContact.id,
        content: newMessage.trim(),
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, localMsg]);
      setNewMessage('');
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setSendingMessage(false);
    }
  };

  // Listen to Enter key inside textarea (Submit chat)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Filter contacts by search query
  const filteredContacts = contacts.filter(contact => 
    contact.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout navItems={navItems} title="Direct Secure Chats">
      <div className="h-[calc(100vh-12rem)] min-h-[500px] flex bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Left Side: Contact List */}
        <div className="w-80 md:w-96 border-r border-gray-100 flex flex-col h-full bg-gray-50/20">
          <div className="p-5 border-b border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">Direct Messaging</h3>
            <div className="relative group">
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 outline-none rounded-md text-xs font-semibold text-gray-700 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {loadingContacts ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-gray-100 rounded w-24"></div>
                    <div className="h-3 bg-gray-100 rounded w-40"></div>
                  </div>
                </div>
              ))
            ) : filteredContacts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-400 text-xs font-bold">No students found</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full flex items-center gap-3 p-3 rounded-md transition-all text-left group
                    ${selectedContact?.id === contact.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' 
                      : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors
                    ${selectedContact?.id === contact.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                    {contact.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${selectedContact?.id === contact.id ? 'text-white' : 'text-gray-800'}`}>
                      {contact.username}
                    </p>
                    <p className={`text-[10px] truncate ${selectedContact?.id === contact.id ? 'text-white/80' : 'text-gray-400 font-semibold'}`}>
                      {contact.email}
                    </p>
                    {contact.class_name && (
                      <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded mt-1
                        ${selectedContact?.id === contact.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {contact.class_name}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Message Feed */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          {selectedContact ? (
            <>
              {/* Active Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center font-bold">
                    {selectedContact.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{selectedContact.username}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{selectedContact.class_name || 'Enrolled Student'}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchConversation(selectedContact.id)}
                  title="Reload chat history"
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <ArrowPathIcon className={`h-4.5 w-4.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {loadingMessages && messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">Retrieving encrypted conversation...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-3 shadow-inner">
                      <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
                    </div>
                    <h5 className="font-bold text-gray-800 text-sm">No Messages Yet</h5>
                    <p className="text-gray-400 text-xs font-medium max-w-sm mt-1">Send a secure direct message to start your conversation with {selectedContact.username}.</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOwn = msg.sender_id === user?.id;
                    return (
                      <div 
                        key={msg.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] rounded-md p-4 text-sm leading-relaxed shadow-sm relative group
                          ${isOwn 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
                        >
                          <p>{msg.content}</p>
                          <span className={`block text-[9px] mt-1 font-bold
                            ${isOwn ? 'text-white/60 text-right' : 'text-gray-400'}`}>
                            {new Date(msg.created_at).toLocaleTimeString(undefined, {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Message Input Box */}
              <div className="p-4 border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-3 bg-gray-50 border border-gray-100 rounded-md p-2 focus-within:bg-white focus-within:border-blue-500/20 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
                  <textarea 
                    rows={1}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your secure direct message here..."
                    className="flex-1 bg-transparent px-3 py-2 outline-none text-xs font-semibold text-gray-700 placeholder:text-gray-400 resize-none max-h-24 align-middle"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sendingMessage}
                    className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-blue-500/10 flex-shrink-0"
                  >
                    <PaperAirplaneIcon className="h-4.5 w-4.5 -rotate-45" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50/20">
              <div className="w-20 h-20 bg-blue-50/50 border border-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4 shadow-sm">
                <ChatBubbleLeftRightIcon className="h-10 w-10 text-blue-500 animate-pulse" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">Secure Direct Message Room</h4>
              <p className="text-gray-400 text-xs font-semibold max-w-sm mt-1.5">Please select a student from the sidebar list to begin a secure direct conversation.</p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
