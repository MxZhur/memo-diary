<script setup lang="ts">
import { useRouter } from 'vue-router';
import MemoEntryForm from '../components/MemoEntryForm.vue';
import { MemoEntryFormFields } from '../stores/memoEntriesStore';
import { useMemoEntriesStore } from '../stores/memoEntriesStore';

const memoEntriesStore = useMemoEntriesStore()
const router = useRouter()

const onFormSubmitted = (formFields: MemoEntryFormFields) => {
  memoEntriesStore.addEntry(formFields)
  router.go(-1)
}

const goBack = () => {
  router.go(-1)
}

</script>

<template>
  <div>
    <h2>New Memory</h2>
    <div>
      <MemoEntryForm @submitted="onFormSubmitted" @cancelled="goBack" />
    </div>
  </div>
</template>

<style scoped></style>
