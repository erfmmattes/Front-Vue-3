<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Lista de Usuários</span>
        <v-btn color="primary" to="/users/new">Cadastrar Usuário</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <template v-slot:item.is_active="{ item }">
            <v-chip :color="item.is_active ? 'green' : 'red'" dark>
              {{ item.is_active ? 'Ativo' : 'Inativo' }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <v-icon small @click.stop="toggleStatus(item)" title="Alterar Status" class="mr-2" style="cursor:pointer;">
                {{ item.is_active ? 'mdi-close-circle-outline' : 'mdi-check-circle-outline' }}
              </v-icon>

              <v-icon
                small
                class="mr-2"
                @click="editItem(item.id)"
                title="Editar"
                style="cursor:pointer;"
              >
                mdi-pencil
              </v-icon>

              <v-icon
                small
                color="red"
                @click="deleteItem(item.id)"
                title="Deletar"
                style="cursor:pointer;"
              >
                mdi-delete
              </v-icon>
            </div>
          </template>
					<template v-slot:no-data>
						<div class="text-center pa-4">Nenhum dado disponível</div>
					</template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api.ts';

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['user-updated']);
const loading = ref(false);
const router = useRouter();

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'E-mail', key: 'email' },
  { title: 'Cargo', key: 'cargo_name' },
  { title: 'Status', key: 'is_active' },
  { title: 'Ações', key: 'actions', sortable: false },
];

const editItem = (id: number) => {
  router.push(`/users/${id}`);
};

const toggleStatus = async (user: { id: number; is_active: boolean }) => {
  const newStatus = !user.is_active;
  try {
    await api.patch(`/users/${user.id}/status`, { is_active: newStatus });
    emit('user-updated');
  } catch (error) {
    console.error('Erro ao alterar status:', error);
    alert('Erro ao alterar o status do usuário.');
  }
};

const deleteItem = async (id: number) => {
  if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

  try {
    await api.delete(`/users/${id}`);
    alert('Usuário deletado com sucesso!');
    emit('user-updated');
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    alert('Erro ao deletar usuário.');
  }
};
</script>
