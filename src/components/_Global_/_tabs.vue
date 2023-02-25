<template>
<div class="mb-3">
    <div class="mx-auto" style="width: 220px;">
        <button class="btn btn-white border" :class="current_section == 1?  'mytab text-white' : 'shadow'" @click="$emit('reload',1)">{{ tab_one }}</button>
        <button class="btn btn-white border" :class="current_section == 2?  'mytab text-white' : 'shadow'" @click="$emit('reload',2);">{{ tab_two }}</button>
    </div>
</div>
</template>

<script setup>
defineProps({
    current_section: {
        required: true,
        type: Number,
        default: 1,
    },
    tab_one: {
        required: true,
        type: String,
        default: 'Tab One'
    },
    tab_two: {
        required: true,
        type: String,
        default: 'Tab Two'
    }
})
defineEmits(['reload'])
</script>

<style scoped>
.mytab {
    background-color: #1d92cf !important;
    border: 0 !important;
    box-shadow: 20px -1px 247px -23px rgba(66, 58, 58, 0.8) inset;
    -webkit-box-shadow: 20px -1px 247px -23px rgba(66, 58, 58, 0.8) inset;
    -moz-box-shadow: 20px -1px 247px -23px rgba(66, 58, 58, 0.8) inset;
}
</style>
