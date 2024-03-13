<template>
    <div class="star-rating-container">
        <div v-if="readonly" v-for="starFilled in filledStars">
            <font-awesome-icon v-if="starFilled.filled" icon="fa-solid fa-star" />
            <font-awesome-icon v-else icon="fa-regular fa-star" />
        </div>
        <div v-else v-for="starFilled in filledStars" class="clickable" @click="onStarClicked(starFilled.value)">
            <font-awesome-icon v-if="starFilled.filled" icon="fa-solid fa-star" />
            <font-awesome-icon v-else icon="fa-regular fa-star" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    rating: {
        required: true,
        type: Number,
    },
    readonly: {
        required: false,
        type: Boolean,
        default: false,
    },
    maxStars: {
        required: false,
        type: Number,
        default: 10,
    }
})

const emit = defineEmits(['ratingChange'])

const filledStars = computed(() => {
    let stars = []

    for (let index = 0; index < Math.abs(props.maxStars); index++) {
        stars.push({
            value: index + 1,
            filled: index < props.rating,
        })
    }

    return stars
})

const onStarClicked = (clickedRating: number) => {
    emit('ratingChange', clickedRating)
}

</script>

<style scoped>
.star-rating-container {
    display: flex;
    flex-direction: row;
    color: #00aa44;
    margin-top: 5px;
    margin-bottom: 5px;
}

.clickable {
    cursor: pointer;
    font-size: 1.5rem;
}
</style>
