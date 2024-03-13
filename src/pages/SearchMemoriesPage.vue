<script setup lang="ts">
import { ref } from 'vue';
import { MemoEntry, MemoEntrySearchFields, useMemoEntriesStore } from '../stores/memoEntriesStore';
import { useRouter } from 'vue-router';
import MemorySearchForm from '../components/MemorySearchForm.vue';
import EntryList from '../components/EntryList.vue';

const memoEntriesStore = useMemoEntriesStore();
const router = useRouter()

const entries = ref<MemoEntry[]>([])

const onFormSubmitted = (formFields: MemoEntrySearchFields) => {
  entries.value = memoEntriesStore.searchEntries(formFields);
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
        <h2>Search Memories</h2>
      </div>
    </div>

    <MemorySearchForm @submitted="onFormSubmitted" />

    <EntryList :entries="entries" />
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
</style>
