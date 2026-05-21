import api from '../lib/axios';

export interface Class {
  id: number;
  name: string;
  description?: string;
  code: string;
  teacherId: number;
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
  }
};
