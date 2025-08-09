<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="authStore.isAuthenticated">
      <v-toolbar-title class="mr-12">Meu Sistema</v-toolbar-title>

      <v-btn text to="/" exact>Usuários</v-btn>
      <v-btn text to="/cargos">Cargos</v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="logout" title="Sair">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth'; 
import { onMounted } from 'vue';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logoutAndRedirect(); 
};

onMounted(() => {
  authStore.checkAuth(); 
});
</script>
