import axios from 'axios';
import { User } from '@/types';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const UserService = {
  async getUsers() {
    return axios.get(`${API_URL}/users`, { headers: getAuthHeader() });
  },
  async createUser(data: Omit<User, 'id' | 'is_active' | 'created_at' | 'updated_at'>) {
    return axios.post(`${API_URL}/users`, data, { headers: getAuthHeader() });
  },
  async updateUser(id: number, data: Omit<User, 'id' | 'is_active' | 'created_at' | 'updated_at'>) {
    return axios.put(`${API_URL}/users/${id}`, data, { headers: getAuthHeader() });
  },
  async updateUserStatus(id: number) {
    return axios.patch(`${API_URL}/users/${id}/status`, { headers: getAuthHeader() });
  },
};