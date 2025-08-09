<template>
  <v-app>
    <v-main>
      <v-container class="pa-4" style="max-width: 600px;">
        <v-card class="mx-auto" max-width="100%">
          <v-card-title class="d-flex align-center justify-space-between">
            <v-btn icon @click="goBack" title="Voltar">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="text-h5">{{ formTitle }}</span>
            <div style="width: 40px;"></div> <!-- Espaço para equilibrar o layout -->
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="user.name"
                label="Nome do Usuário"
                :rules="[v => !!v || 'Nome é obrigatório']"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="E-mail"
                type="email"
                :rules="[v => !!v || 'E-mail é obrigatório']"
                required
              ></v-text-field>
              
              <v-text-field
                v-if="!user.id"
                v-model="user.password"
                label="Senha"
                type="password"
                :rules="[v => !!v || 'Senha é obrigatória']"
                required
              ></v-text-field>

              <v-select
                v-model="user.cargo_id"
                :items="cargos"
                item-title="name"
                item-value="id"
                label="Cargo"
                :rules="[v => !!v || 'Cargo é obrigatório']"
                required
              ></v-select>
              <v-btn type="submit" color="primary" class="mt-4" block>{{ buttonText }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import api from '@/services/api.ts';

const emit = defineEmits(['user-created']);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const user = ref({
  id: null,
  name: '',
  email: '',
  password: '',
  cargo_id: null,
});

const cargos = ref([]);

const formTitle = computed(() => (user.value.id ? 'Editar Usuário' : 'Novo Usuário'));
const buttonText = computed(() => (user.value.id ? 'Atualizar' : 'Cadastrar'));

onMounted(async () => {
  try {
    const response = await api.get('/cargos');
    cargos.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar cargos:', error);
  }

  if (route.params.id) {
    user.value.id = Number(route.params.id);
    try {
      const response = await api.get(`/users/${user.value.id}`);
      console.log('Usuário carregado:', response.data);

      user.value.name = response.data.name ?? '';
      user.value.email = response.data.email ?? '';
      user.value.cargo_id = response.data.cargo_id ?? null;
      user.value.password = ''; // limpa senha para edição
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  }
});

const submitForm = async () => {
  try {
    if (user.value.id) {
      const updateUserPayload = {
        name: user.value.name,
        email: user.value.email,
        cargo_id: user.value.cargo_id,
      };

      await api.put(`/users/${user.value.id}`, updateUserPayload);
      alert('Usuário atualizado com sucesso!');
      router.push('/');
    } else {
      await api.post('/users', user.value);
      alert('Usuário criado com sucesso!');
      emit('user-created');
      router.push('/');
    }
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    alert('Erro ao salvar usuário.');
  }
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const goBack = () => {
  router.back();
};
</script>
