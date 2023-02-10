<template>
<div class="px-4 d-flex align-items-center justify-content-between">
    <h6 class="px-2">{{ title }}</h6>
    <span class="px-2">{{ string }}</span>
</div>
</template>

<script setup>
defineProps(['title', 'string']);
</script>
