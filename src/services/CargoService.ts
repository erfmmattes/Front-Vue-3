import axios from 'axios';
import { Cargo } from '@/types';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const CargoService = {
  async getCargos() {
    return axios.get(`${API_URL}/cargos`, { headers: getAuthHeader() });
  },
  async createCargo(data: { name: string }) {
    return axios.post(`${API_URL}/cargos`, data, { headers: getAuthHeader() });
  },
  async updateCargo(id: number, data: Partial<Cargo>) {
    return axios.put(`${API_URL}/cargos/${id}`, data, { headers: getAuthHeader() });
  },
  async deleteCargo(id: number) {
    return axios.delete(`${API_URL}/cargos/${id}`, { headers: getAuthHeader() });
  },
  async getCargoById(id: number) {
    return axios.get(`${API_URL}/cargos/${id}`, { headers: getAuthHeader() });
  },
};
