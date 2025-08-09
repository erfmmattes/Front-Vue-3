import { defineStore } from 'pinia';
import { UserService } from '@/services/UserService';
import { User } from '@/types';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await UserService.getUsers();
        this.users = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    },
    async createUser(userData: Omit<User, 'id' | 'is_active' | 'created_at' | 'updated_at'>) {
      try {
        const response = await UserService.createUser(userData);
        this.users.push(response.data);
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
      }
    },
    async updateUser(id: number, userData: Omit<User, 'id' | 'is_active' | 'created_at' | 'updated_at'>) {
      try {
        const response = await UserService.updateUser(id, userData);
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      }
    },
    async deactivateUser(id: number) {
      try {
        await UserService.updateUserStatus(id); // corrigido aqui
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index].is_active = false;
        }
      } catch (error) {
        console.error('Erro ao desativar usuário:', error);
        throw error;
      }
    },
  },
});