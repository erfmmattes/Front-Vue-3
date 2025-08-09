<template>
  <v-container class="pa-4" style="max-width: 400px;">
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <v-btn icon @click="goBack" title="Voltar">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span>{{ formTitle }}</span>
            <div style="width: 40px;"></div> <!-- Espaço para equilibrar -->
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="cargo.name"
                label="Nome do Cargo"
                :rules="[v => !!v || 'Nome do cargo é obrigatório']"
                required
              ></v-text-field>

              <v-btn
                type="submit"
                color="primary"
                :loading="loading"
                :disabled="loading"
                class="mt-4"
                block
              >
                {{ buttonText }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api.ts';

const emit = defineEmits(['cargo-created']);
const router = useRouter();
const route = useRoute();

const cargo = ref({
  id: null,
  name: '',
});
const loading = ref(false);

const formTitle = computed(() => (cargo.value.id ? 'Editar Cargo' : 'Novo Cargo'));
const buttonText = computed(() => (cargo.value.id ? 'Atualizar' : 'Cadastrar'));

onMounted(async () => {
  if (route.params.id) {
    cargo.value.id = Number(route.params.id);
    try {
      const response = await api.get(`/cargos/${cargo.value.id}`);
      
      cargo.value.name = response.data.name ?? '';
    } catch (error) {
      console.error('Erro ao carregar cargo para edição:', error);
      alert('Erro ao carregar os dados do cargo para edição.');
    }
  }
});

const submitForm = async () => {
  if (!cargo.value.name) return;

  loading.value = true;
  try {
    if (cargo.value.id) {
      await api.put(`/cargos/${cargo.value.id}`, { name: cargo.value.name });
      alert('Cargo atualizado com sucesso!');
    } else {
      await api.post('/cargos', { name: cargo.value.name });
      alert('Cargo criado com sucesso!');
      cargo.value.name = '';
    }
    
    emit('cargo-created');
    router.push('/cargos');
  } catch (error) {
    console.error('Erro ao salvar cargo:', error);
    alert('Erro ao salvar o cargo.');
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.back();
};
</script>
