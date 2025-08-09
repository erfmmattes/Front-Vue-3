<template>
  <v-container>
    <v-row>
      <v-col>
        <CargoList :cargos="cargos" :loading="loading" @cargo-updated="fetchCargos" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import CargoForm from '@/components/cargos/CargoForm.vue';
import CargoList from '@/components/cargos/CargoList.vue';
import { useCargoStore } from '@/store/cargos';

const cargoStore = useCargoStore();
const cargos = computed(() => cargoStore.cargos);
const loading = ref(false); 

const fetchCargos = async () => {
  loading.value = true;
  try {
    await cargoStore.fetchCargos();
    console.log('Cargos carregados na CargoView:', cargos.value);
  } catch (error) {
    console.error('Erro ao carregar cargos na CargoView:', error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchCargos();
});
</script>