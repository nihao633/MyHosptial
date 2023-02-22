<template>
<div class='text-danger' v-if="unauthorized">
    You don't have enough privilege to create a new medical record.
</div>
</template>
<script setup>
defineProps(['unauthorized'])
</script>