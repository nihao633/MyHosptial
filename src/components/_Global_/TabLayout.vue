<template>
<div class="container mx-auto" >
    <h1 class="my-4">{{ title }}</h1>
    <ul class="nav nav-tabs">
        <li class="nav-item" v-for="(item,key) in array">
            <a class="nav-link" @click="$emit('select',key)" :class="{ active: current_tab == key }" role="button">{{ item }}</a>
        </li>
    </ul>
</div>
</template>
<script setup>
defineProps(['title','array','current_tab'])
defineEmits(['select'])
</script>
<style scoped>
a {
    color: #1d92cf !important;
}

a:hover {
    border-radius: 0 !important;
}

.active {
    color: grey !important;
    border-radius: 0 !important;
}
</style>