<template>
<div class="row mx-0 px-0">
    <div class="bg-secondary col-6 p-3 text-white text-center border" role="button" @click="$emit('clicked_one')">
        {{ button_one }}
    </div>
    <div class="bg-secondary col-6 p-3 text-white text-center border" role="button" @click="$emit('clicked_two')">
        {{ button_two }}
    </div>
</div>
</template>

<script setup>
defineProps({
    button_one: {
        type: String,
        required: true,
    },
    button_two: {
        type: String,
        required: true,
    },
})

defineEmits(['clicked_one','clicked_two'])
</script>

<style scoped>
.row div:hover{
    background-color: #1d92cf !important;
}
</style>
