<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppLogo from '../components/AppLogo.vue';
import { APP_AUTHOR, APP_RELEASE_YEAR, APP_VERSION } from '../utils/appInfo';

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

</script>

<template>
  <div>
    <div class="container">
      <AppLogo />

      <div>Version {{ APP_VERSION }}</div>
      <div>
        {{ APP_RELEASE_YEAR }} &#169; {{ APP_AUTHOR }}
      </div>
      <div>
        Made with
        <a href="https://vuejs.org/" target="_blank">
          Vue
        </a>
        +
        <a href="https://tauri.app" target="_blank">
          Tauri
        </a>
      </div>
      <div>
        <a href="https://github.com/MxZhur/memo-diary" target="_blank">
          GitHub Page
        </a>
      </div>
      <div>
        Inspired by Bletraut's Memories app.
      </div>

      <button @click="goBack">
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
        &nbsp;
        Back
      </button>
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100%;
  line-height: 2rem;
}
</style>
