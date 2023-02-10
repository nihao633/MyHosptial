<template>
<div class="p-2 d-flex align-items-center justify-content-between border-bottom">
    <h3 class="px-2">{{ title }}</h3>
    <span class="px-2">{{ string }}</span>
</div>
</template>
<script setup>
defineProps(['title','string']);
</script>
