<template>
<div class="col-6">
    <img :src="image_path" class="d-none d-xl-block" :alt="image_description" />
</div>
</template>
<script setup>
defineProps(['image_path','image_description'])
</script>