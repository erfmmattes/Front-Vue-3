import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const AuthService = {
  async login(credentials: { email: string; password: string }) {
    return axios.post(`${API_URL}/auth/login`, credentials);
  },
};