<template>
    <div class="entry-list-item-container"
        :class="{ 'password-protected': entry.passwordHash !== null && entry.passwordHash !== '' }">
        <div v-if="showProtectedEntry">
            <div class="entry-list-item-title">
                {{ entry.title }}
            </div>

            <div class="entry-list-item-datetime">
                <div>
                    <font-awesome-icon icon="fa-regular fa-calendar-days" />
                    {{ date }}
                </div>
                <div style="width: 0.5rem;"></div>
                <div>
                    <font-awesome-icon :icon="['far', 'clock']" />
                    {{ time }}
                </div>
            </div>

            <StarRating :rating="entry.rating" :readonly="true" />

            <div v-if="entry.keywords.length">
                <div v-for="keyword in entry.keywords" class="pill">{{ keyword }}</div>
            </div>

            <div v-if="entry.description.trim().length">
                <div class="entry-list-item-description" :class="{ 'expanded': expandDescription }">
                    {{ entry.description }}
                </div>
                <div>
                    <button @click="toggleExpandDescription">{{ expandDescription ? 'Less' : 'More...' }}</button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="entry-list-item-title">
                {{ entry.title }}
            </div>

            <div class="entry-list-item-datetime">
                <div>
                    <font-awesome-icon icon="fa-regular fa-calendar-days" />
                    {{ date }}
                </div>
                <div style="width: 0.5rem;"></div>
                <div>
                    <font-awesome-icon :icon="['far', 'clock']" />
                    {{ time }}
                </div>
            </div>

            <form @submit.prevent="onPasswordEnter">
                <div>
                    <label>Enter password</label>
                </div>
                <div>
                    <input type="password" v-model="password" placeholder="Password" />
                </div>
                <div>
                    {{ passwordError }}
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { MemoEntry } from '../stores/memoEntriesStore';
import dayjs from 'dayjs';
import StarRating from './StarRating.vue';
import { validatePassword } from '../utils/password';

const props = defineProps({
    entry: {
        required: true,
        type: Object as PropType<MemoEntry>,
    }
})

const defaultShowProtectedEntry = !(props.entry.passwordHash !== null && props.entry.passwordHash !== '')

const showProtectedEntry = ref(defaultShowProtectedEntry)

const expandDescription = ref(false)

const password = ref('')
const passwordError = ref('')

const date = computed(() => {
    return dayjs.unix(props.entry.datetime).format('l')
})

const time = computed(() => {
    return dayjs.unix(props.entry.datetime).format('LT')
})

const onPasswordEnter = () => {
    if (validatePassword(password.value, props.entry.passwordHash ?? '')) {
        passwordError.value = ''
        showProtectedEntry.value = true
    } else {
        passwordError.value = 'Wrong password'
        showProtectedEntry.value = false
    }
}

const toggleExpandDescription = () => {
    expandDescription.value = !expandDescription.value
}

</script>

<style scoped>
.entry-list-item-container {
    border: 1px solid gray;
    background-color: white;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 15px;
    width: auto;
}

.entry-list-item-container.password-protected {
    background-color: rgb(190, 218, 255);
}

.entry-list-item-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.entry-list-item-datetime {
    color: #444;
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
}

.entry-list-item-description {
    max-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    margin-bottom: 10px;
}

.entry-list-item-description.expanded {
    max-height: unset;
    overflow: unset;
}

.pill {
    display: inline-block;
    margin-right: 5px;
    padding: 5px;
    min-width: 35px;
    border-radius: 50px;
    background-color: #14608d;
    color: white;
    font-size: 0.8rem;
    text-align: center;
}
</style>
