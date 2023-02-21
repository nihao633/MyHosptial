<template>
<div class="col-12 col-lg-8 col-xl-6">
    <h1>{{ title }}</h1>
    <form class="form-control my-3" @submit.prevent="$emit('submit')">
        <slot />
    </form>
</div>
</template>
<script setup>
defineProps(['title'])
defineEmits(['submit'])
</script>