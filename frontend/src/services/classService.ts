import api from '../lib/axios';

export interface Class {
  id: number;
  name: string;
  description?: string;
  code: string;
  teacherId: number;
}

export interface PendingRequest {
  id: number;
  student_id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  requested_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const classService = {
  getAll: async () => {
    const response = await api.get('/classes');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  },

  create: async (data: Partial<Class>) => {
    const response = await api.post('/classes', data);
    return response.data;
  },

  join: async (code: string) => {
    const response = await api.post('/classes/join', { code });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
  },

  getEnrolledStudents: async (id: number) => {
    const response = await api.get(`/classes/${id}/students`);
    return response.data;
  },

  getTeacherClasses: async () => {
    const response = await api.get('/classes');
    return response.data;
  },

  getStudentClasses: async () => {
    const response = await api.get('/classes');
    return response.data;
  },

  getPendingRequests: async (classId: number) => {
    const response = await api.get(`/classes/${classId}/join-requests`);
    return response.data;
  },

  approvePendingRequest: async (classId: number, requestId: number) => {
    const response = await api.post(`/classes/${classId}/join-requests/${requestId}/approve`);
    return response.data;
  },

  rejectPendingRequest: async (classId: number, requestId: number) => {
    const response = await api.post(`/classes/${classId}/join-requests/${requestId}/reject`);
    return response.data;
  }
};
