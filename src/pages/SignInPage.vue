<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalPasswordStore } from '../stores/globalPasswordStore';
import { validatePassword } from '../utils/password';

const globalPasswordStore = useGlobalPasswordStore();
const router = useRouter()

const password = ref('')
const passwordError = ref('')

const onPasswordEntered = () => {
  if (globalPasswordStore.passwordHash !== null && !validatePassword(password.value, globalPasswordStore.passwordHash)) {
    passwordError.value = 'Wrong password'
    return;
  }

  passwordError.value = ''
  globalPasswordStore.accessGranted = true
  router.push('/latest-memories')
}

</script>

<template>
    <div class="container">
      <form @submit.prevent="onPasswordEntered">
        <label>Enter Password</label>
        <input type="password" v-model="password" />
        <div>{{ passwordError }}</div>
      </form>
    </div>
</template>

<style scoped>

.container, .container > form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100%;
}
</style>
