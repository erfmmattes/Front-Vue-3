<template>
  <v-container fluid style="height: 100vh;">
    <v-row align="center" justify="center" style="height: 100%;">
      <v-col cols="auto">
        <v-card width="400">
          <v-card-title class="text-h5 text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="E-mail"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" block class="mt-4" :loading="loading">Entrar</v-btn>
              <v-alert v-if="error" type="error" dismissible class="mt-4">{{ error }}</v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.login({ email: email.value, password: password.value });
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Erro ao fazer login.';
  } finally {
    loading.value = false;
  }
};
</script>