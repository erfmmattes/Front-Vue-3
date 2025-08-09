import { defineStore } from 'pinia';
import { AuthService } from '@/services/AuthService';
import { LoginCredentials } from '@/types';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async login(credentials: LoginCredentials) {
      try {
        const response = await AuthService.login(credentials);
        this.token = response.data.token;
        this.isAuthenticated = true;

        if (this.token) {
          localStorage.setItem('token', this.token);
        }

        router.push('/');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      router.push('/login');
    },
    checkAuth() {
      const storedToken = localStorage.getItem('token');
      this.isAuthenticated = !!storedToken;
      this.token = storedToken;
    },
  },
});
