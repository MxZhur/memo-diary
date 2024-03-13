<script setup lang="ts">
import { useMemoEntriesStore } from '../stores/memoEntriesStore';
import EntryList from '../components/EntryList.vue';

const memoEntriesStore = useMemoEntriesStore();
</script>

<template>
  <div>
    <div class="header">
      <h2>Latest Memories</h2>
      <div class="header-right">
        <router-link to="/search-memories">
          <button>
            <font-awesome-icon icon="fa-solid fa-search" />
            &nbsp;
            Search
          </button>
        </router-link>
        &nbsp;
        <router-link to="/settings">
          <button>
            <font-awesome-icon icon="fa-solid fa-cog" />
            &nbsp;
            Settings
          </button>
        </router-link>
        &nbsp;
        <router-link to="/about">
          <button>
            <font-awesome-icon icon="fa-solid fa-info-circle" />
            &nbsp;
            About
          </button>
        </router-link>
      </div>
    </div>
    <div>
      <router-link to="/new-memory">
        <button class="full-width">
          <font-awesome-icon icon="fa-solid fa-add" />
          &nbsp;
          New Memory
        </button>
      </router-link>
    </div>
    <EntryList :entries="memoEntriesStore.latestEntries" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header-right {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
</style>
