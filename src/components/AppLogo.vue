<template>
    <div class="app-logo-container">
        <div class="app-logo-image">
            <img src="../assets/memo-diary-icon.svg" height="200" />
        </div>
        <div class="app-logo-text">
            <div>Memo</div>
            <div>Diary</div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style>
.app-logo-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.app-logo-image {
    margin-right: 15px;
}

.app-logo-text {
    font-size: 3rem;
    color: #f2a72e;
    line-height: 3.5rem;
}
</style>