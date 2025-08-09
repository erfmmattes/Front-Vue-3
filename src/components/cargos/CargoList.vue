<template>
  <v-card max-width="100%" class="w-100">
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h5">Lista de Cargos</span>
      <v-btn color="primary" to="/cargos/new">Cadastrar Cargo</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="cargos"
        :loading="loading"
        class="elevation-1 w-100"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.actions="{ item }">
          <div class="d-flex align-center">
            <v-icon
              small
              class="mr-2"
              @click.stop="editItem(item.id)"
              title="Editar Cargo"
              style="cursor:pointer;"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="red"
              @click.stop="deleteItem(item.id)"
              title="Excluir Cargo"
              style="cursor:pointer;"
            >
              mdi-delete
            </v-icon>
          </div>
        </template>
        <template v-slot:no-data>
          <div class="text-center pa-4">Nenhum cargo disponível.</div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api.ts';

const props = defineProps({
  cargos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['cargo-updated']);
const loading = ref(false);
const router = useRouter();

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Ações', key: 'actions', sortable: false },
];

const editItem = (id: number) => {
  router.push(`/cargos/${id}`);
};

const deleteItem = async (id: number) => {
  if (!confirm('Tem certeza que deseja excluir este cargo?')) return;

  try {
    loading.value = true;
    await api.delete(`/cargos/${id}`);
    emit('cargo-updated'); // Para recarregar a lista
  } catch (error: any) {
    console.error('Erro ao excluir cargo:', error);

    const message =
      error.response?.data?.error ||
      'Erro desconhecido ao excluir cargo. Tente novamente.';

    alert(message);
  } finally {
    loading.value = false;
  }
};
</script>
