<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Meu Sistema</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Usuários</v-btn>
      <v-btn text to="/cargos">Cargos</v-btn>
      <v-btn text @click="logout">Sair</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
};
</script>