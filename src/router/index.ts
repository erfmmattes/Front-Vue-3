import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import UserView from '@/views/UserView.vue';
import CargoView from '@/views/CargoView.vue';
import CargoForm from '@/components/cargos/CargoForm.vue';
import UserForm from '@/components/users/UserForm.vue'; // Importe UserForm

const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'Login', component: AuthView },
  { path: '/', name: 'Users', component: UserView, meta: { requiresAuth: true } },
  { path: '/users/new', name: 'UserNew', component: UserForm, meta: { requiresAuth: true } },
  { path: '/users/:id', name: 'UserEdit', component: UserForm, meta: { requiresAuth: true } },
  { path: '/cargos', name: 'Cargos', component: CargoView, meta: { requiresAuth: true } },
  { path: '/cargos/new', name: 'CargoNew', component: CargoForm, meta: { requiresAuth: true } },
  { path: '/cargos/:id', name: 'CargoEdit', component: CargoForm, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;