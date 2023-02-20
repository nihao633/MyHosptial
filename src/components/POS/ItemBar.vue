<template>
<div class="py-2 col-5 col-lg-5 col-xl-7 mb-3">
    <span class="d-block">{{ item_name }}</span>
    <small v-if="item_name !== 'Name'"><strong>Qty: {{ quantity }}</strong> at {{ price }} MMK/pcs</small>
</div>
</template>

<script setup>
defineProps(['item_name','quantity','price'])
</script>
