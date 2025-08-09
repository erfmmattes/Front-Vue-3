<template>
  <v-app>
    <v-main>
      <v-container class="mt-8">
        <v-row>
          <v-col>
            <UserList :users="users" @user-updated="fetchUsers" /> 
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserForm from '@/components/users/UserForm.vue';
import UserList from '@/components/users/UserList.vue';
import { useUserStore } from '@/store/users';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();

const users = computed(() => userStore.users);

const fetchUsers = () => {
  userStore.fetchUsers();
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};

onMounted(() => {
  fetchUsers();
});
</script>