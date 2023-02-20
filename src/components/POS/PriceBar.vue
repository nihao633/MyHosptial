<template>
<div class="py-2 col-5 col-lg-5 col-xl-7 mb-3" v-if="typeof(price) !== 'number'">
    <span class="d-block">{{ price }}</span>
</div>
<p class="py-4 py-xl-2 col text-end" v-else>
    <strong>
        {{ price }} MMK
    </strong>
</p>
</template>

<script setup>
defineProps(['price'])
</script>
