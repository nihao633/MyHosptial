<template>
<div class="d-block d-lg-flex">
    <div class="input-group mb-3">
        <span class="input-group-text">{{ label_one }}</span>
        <input :type="type_one" class="form-control" :value="input_one" @input="$emit('update:input_one',$event.target.value)" :placeholder="'Type '+ label_one.toLowerCase() + ' here'">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text">{{ label_two }}</span>
        <input :type="type_two" class="form-control" :value="input_two" @input="$emit('update:input_two',$event.target.value)" :placeholder="'Type ' + label_two.toLowerCase() + ' here'">
    </div>
</div>
</template>
<script setup>
defineProps({
    type_one: {
        type: String,
        default: 'text'
    },
    type_two: {
        type: String,
        default: 'text'
    },
    label_one: {
        required: true,
        type: String,
    },
    label_two: {
        required: true,
        type: String,
    },
    input_one: {
        required: true,
        type: String,
    },
    input_two: {
        required: true,
        type: String,
    },
})
defineEmits(['update:input_one','update:input_two']) 
</script>
