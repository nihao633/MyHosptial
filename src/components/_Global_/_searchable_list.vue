<template>
<li class="dropdown list-unstyled">
    <button type="button" class="dropdown-toggle form-control text-start text-wrap" :class="class" data-bs-toggle="dropdown" :data-bs-target="'#'+select_id">
        {{ selected_val == '' ? placeholder : set_name(selected_val,path)  }}
    </button>
    <ul :id="select_id" class="dropdown-menu form-control" style="overflow: auto;" :style="array.length > 3 ? 'height:200px;' : ''">
        <input type="text" class="form-control" v-if="searchable" @keydown="pause_search()" @keyup="begin_search($event.target.value)" placeholder="Type here to search">
        <li role="button" class="p-3 custom-select-button" v-if="!not_found && searching == null">Empty</li>
        <li role="button" class="p-3 custom-select-button" v-if="!not_found && searching && searchable">Searching...</li>
        <li role="button" class="p-3 custom-select-button text-danger" v-if="not_found && !searching && searching !== null && searchable">Not Found</li>
        <li class="p-3 custom-select-button" v-if="array.length == 0 && searching !== null">Loading...</li>
        <li role="button" class="p-3 custom-select-button" v-if="!searching" v-for="val in array" @click="$emit('select',val)">{{ set_name(val,path) }}</li>
    </ul>
</li>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { usePosStore } from '../../stores/pos';

const store = usePosStore();
const {
    searching,
    not_found
} = storeToRefs(store)
const timer_id = ref('')
const pause_search = () => {
    clearTimeout(timer_id.value)
    searching.value = false
}
const begin_search = val => {
    not_found.value = false
    clearTimeout(timer_id.value)
    searching.value = true
    timer_id.value = setTimeout(() => {
        emit('search',val)
    }, 1000)
}

const make_uppercase = (str) => {
    if(str.length == 2) return str.charAt(0).toUpperCase() + str.slice(1);

    return str.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
}
const set_name = (val,path = null) => {
    if(typeof(val) == 'string') return make_uppercase(val)
    if(path?.length == 2) return val[path[0]] + ' (' + val[path[1]] + ')'
    if(path?.length == 3) return val[path[0]] + ' (' + val[path[1]] + ')' + ' (' + val[path[2]] + ')'
    if(path?.length == 4) return val[path[0]] + ' (' + val[path[1]] + ')' + ' (' + val[path[2]] + ')' + ' (' + val[path[3]] + ')'
    
    if(path) return val[path[0]]
}

defineProps({
    select_id: {
        type: String,
        default: 'select_dropdown'
    },
    searchable: {
        type: Boolean,
        default: false,
    },
    path: {
        type: Array,
    },
    class: {
        type: String,
        default: '',
    },
    array: {
        required: true,
        type: Array,
    },
    selected_val: {
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Please select one'
    }
})
const emit = defineEmits(['select','search'])
</script>
