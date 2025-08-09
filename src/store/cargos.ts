import { defineStore } from 'pinia';
import { CargoService } from '@/services/CargoService';
import { Cargo } from '@/types';

export const useCargoStore = defineStore('cargos', {
  state: () => ({
    cargos: [] as Cargo[],
  }),
  actions: {
    async fetchCargos() {
      try {
        const response = await CargoService.getCargos();
        this.cargos = response.data;
      } catch (error) {
        console.error('Erro ao buscar cargos:', error);
      }
    },
    async createCargo(name: string) {
      try {
        const response = await CargoService.createCargo({ name });
        this.cargos.push(response.data);
      } catch (error) {
        console.error('Erro ao criar cargo:', error);
        throw error;
      }
    },
  },
});