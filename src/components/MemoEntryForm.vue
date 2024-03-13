<template>
    <div>
        <form @submit.prevent="onSubmitted">
            <div>
                <input type="text" required placeholder="Title" v-model="title">
            </div>

            <div>
                <input type="password" placeholder="Password (optional)" v-model="password">
            </div>

            <div>
                <input type="datetime-local" required placeholder="Date and Time" v-model="datetime">
            </div>

            <div>
                <StarRating :rating="rating" @rating-change="changeRating" />
            </div>

            <div>
                <input type="text" placeholder="Keywords, separated by a comma" v-model="keywords">
            </div>

            <div>
                <textarea placeholder="Description" rows="7" cols="40" v-model="description"></textarea>
            </div>

            <div>
                <strong>WARNING:</strong> You won't be able to edit or delete the entry later on.
            </div>

            <div>
                <button class="btn-save" type="submit">Save</button>
                &nbsp;
                <button @click.prevent="onCancelled">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref } from 'vue';
import StarRating from './StarRating.vue';
import { MemoEntryFormFields } from '../stores/memoEntriesStore';

const emit = defineEmits(['submitted', 'cancelled'])

const title = ref('')
const password = ref('')
const datetime = ref(dayjs().format().slice(0, 16))
const rating = ref(0)
const keywords = ref('')
const description = ref('')

const changeRating = (newRating: number) => {
    rating.value = newRating
}

const onSubmitted = () => {
    emit('submitted', <MemoEntryFormFields>{
        title: title.value.trim(),
        password: password.value,
        rating: rating.value,
        datetime: datetime.value,
        keywords: keywords.value,
        description: description.value
    })
}

const onCancelled = () => {
    emit('cancelled')
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
