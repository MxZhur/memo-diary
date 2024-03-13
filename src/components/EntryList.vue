<template>
    <div v-if="entries.length">
        <EntryListItem v-for="entry in entries" :entry="entry" />
    </div>
    <div v-else>No entries</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { MemoEntry } from '../stores/memoEntriesStore';
import EntryListItem from './EntryListItem.vue';

defineProps({
    entries: {
        required: true,
        type: Array as PropType<MemoEntry[]>,
    }
})
</script>

<style scoped></style>
