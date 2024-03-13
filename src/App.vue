<script setup lang="ts">
import { onMounted } from 'vue';
import { loadDb } from './utils/file';
import { useRouter } from 'vue-router';
import { useGlobalPasswordStore } from './stores/globalPasswordStore';

const globalPasswordStore = useGlobalPasswordStore()
const router = useRouter()

onMounted(async () => {
  await loadDb();

  if (globalPasswordStore.passwordHash !== null) {
    router.push('/sign-in')
  } else {
    router.push('/latest-memories')
  }
})
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
