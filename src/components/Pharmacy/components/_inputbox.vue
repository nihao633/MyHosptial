<template>
<div class="d-block d-lg-flex">
    <div class="input-group mb-3">
        <span class="input-group-text">{{ label_one }}</span>
        <SearchableList v-if="type_one == 'list'" :array="array_one" :path="path_one" :placeholder="placeholder_type_one" :selected_val="input_one" @select="select_value_one" />
        <input v-if="type_one !== 'list'" :type="type_one" class="form-control" :value="input_one" @input="$emit('update:input_one',$event.target.value)" :placeholder="'Type '+ label_one.toLowerCase() + ' here'">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text">{{ label_two }}</span>
        <SearchableList v-if="type_two == 'list'" :array="array_two" :path="path_two" :placeholder="placeholder_type_two" :selected_val="input_two" @select="select_value_two" />
        <input v-if="type_two !== 'list'" :type="type_two" class="form-control" :value="input_two" @input="$emit('update:input_two',$event.target.value)" :placeholder="'Type ' + label_two.toLowerCase() + ' here'">
    </div>
</div>
</template>
<script setup>
import SearchableList from '../../_searchable_list.vue';

defineProps({
    array_one: {
        type: Array,
        default: []
    },
    array_two: {
        type: Array,
        default: []
    },
    path_one: {},
    path_two: {},
    placeholder_type_one: {},
    placeholder_type_two: {},
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
const emit = defineEmits(['update:input_one','update:input_two'])
const select_value_one = val => emit('update:input_one',val)
const select_value_two = val => emit('update:input_two',val)
</script>
