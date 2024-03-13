<template>
    <div>
        <form @submit.prevent="onSubmitted">
            <div>
                <input type="text" placeholder="Text" v-model="text">
            </div>

            <div>
                <label>Since</label>
                <input type="date" placeholder="" v-model="minDatetime">
            </div>
            <div>
                <label>Until</label>
                <input type="date" placeholder="" v-model="maxDatetime">
            </div>

            <div>
                <label>Min Rating</label>
                <StarRating :rating="minRating" @rating-change="changeMinRating" />
            </div>
            <div>
                <label>Max Rating</label>
                <StarRating :rating="maxRating" @rating-change="changeMaxRating" />
            </div>

            <div>
                <input type="text" placeholder="Keywords, separated by a comma" v-model="keywords">
            </div>

            <div>
                <button class="btn-save" type="submit">Search</button>
                &nbsp;
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref } from 'vue';
import StarRating from './StarRating.vue';
import { MemoEntrySearchFields } from '../stores/memoEntriesStore';

const emit = defineEmits(['submitted', 'cancelled'])

const text = ref('')
const minDatetime = ref(dayjs().subtract(1, 'month').format().slice(0, 10))
const maxDatetime = ref(dayjs().format().slice(0, 10))
const minRating = ref(0)
const maxRating = ref(10)
const keywords = ref('')

const changeMinRating = (newRating: number) => {
    minRating.value = newRating
}

const changeMaxRating = (newRating: number) => {
    maxRating.value = newRating
}

const onSubmitted = () => {
    emit('submitted', <MemoEntrySearchFields>{
        text: text.value.trim(),
        minDatetime: minDatetime.value,
        maxDatetime: maxDatetime.value,
        minRating: minRating.value,
        maxRating: maxRating.value,
        keywords: keywords.value,
    })
}

</script>

<style scoped>
input,
textarea {
    width: calc(100% - 50px);
}

textarea {
    resize: vertical;
}

button {
    min-width: 100px;
}

button.btn-save {
    background-color: #1baa73;
}
</style>
