<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalPasswordStore } from '../stores/globalPasswordStore';
import { validatePassword } from '../utils/password';

const globalPasswordStore = useGlobalPasswordStore();
const router = useRouter()

const oldPassword = ref('')
const oldPasswordError = ref('')
const newPassword = ref('')

const changePassword = () => {
  if (globalPasswordStore.passwordHash !== null && !validatePassword(oldPassword.value, globalPasswordStore.passwordHash)) {
    oldPasswordError.value = 'Wrong password'
    return;
  }

  oldPasswordError.value = ''
  if (newPassword.value === '') {
    globalPasswordStore.clearGlobalPassword();
  } else {
    globalPasswordStore.setGlobalPassword(newPassword.value);
  }
}

const goBack = () => {
  router.go(-1)
}

</script>

<template>
  <div>
    <div class="header">
      <div class="header-left">
        <button @click="goBack">
          <font-awesome-icon icon="fa-solid fa-chevron-left" />
          &nbsp;
          Back
        </button>
        &nbsp;
        <h2>Settings</h2>
      </div>
    </div>

    <div class="container">
      <label>Old Password</label>
      <input type="password" v-model="oldPassword" />
      <div>{{ oldPasswordError }}</div>

      <label>New Password</label>
      <input type="password" v-model="newPassword" placeholder="Leave blank to remove password" />

      <div>
        <button @click="changePassword">Change Password</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100%;
}
</style>
