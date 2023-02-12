<template>
<div class="list-group p-2">
    <a v-if="!loading" v-for="value in array" role="button" @click="$emit('select',value)" class="list-group-item list-group-item-action bg-secondary border-secondary text-white" :class="{ active: selected_value == value}">
        <div v-if="is_date">
            {{ value }}
        </div>
        <div class="row" v-else>
            <div class="col-5 mb-2 flex-grow-1" :class="{ 'col-12 col-lg-5': key == 'email' || key == 'name' || key == 'phone_number'}" v-for="(val,key) in array[0]">{{ key.split('_').length == 1 ? key.charAt(0).toUpperCase() + key.slice(1) : make_uppercase(key) }}:&nbsp;{{ value[key] }}</div>
        </div>
        <div v-if="selected_value !== null && selected_value == value && !is_date" class="bottom-0 end-0 position-absolute bg-white shadow">
            <button class="btn btn-mine text-secondary" title="view more" data-bs-target="#edit_dialog" data-bs-toggle="modal"><i class="fa-solid fa-eye"></i></button>
            <button class="btn btn-mine text-secondary" title="edit" data-bs-target="#edit_dialog" data-bs-toggle="modal" @click="$emit('edit_on',true)" v-if="!disabled_edit"><i class="fa-solid fa-file-pen"></i></button>
            <button class="btn btn-mine text-danger" title="delete" data-bs-target="#confirm_dialog" data-bs-toggle="modal"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div v-if="selected_value !== null && selected_value == value && is_date" class="bottom-0 end-0 position-absolute bg-white shadow">
            <button class="btn btn-mine text-danger" title="delete" @click="$emit('remove',array.indexOf(value))"><i class="fa-solid fa-trash"></i></button>
        </div>
    </a>
    <div v-if="!loading && array.length == 0" class="text-danger">
        {{ empty_msg ?? 'There is nothing to display.' }}
    </div>
    <div v-if="loading" class="p-2">
        <h6>
            Loading...
        </h6>
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>
</template>
<script setup>
const make_uppercase = (str) => {
    let arr = [];
    str.split('_').forEach((value)=>{
        arr.push(value.charAt(0).toUpperCase() + value.slice(1))
    })
    
    return arr.join(' ')
}
defineProps({
    is_date: {
        type:Boolean,
        default: false,
    },
    empty_msg: {
        type: String,
        default: null,
    },
    disabled_edit: {
        default: false,
        type: Boolean
    },
    loading: {
        required: true,
        type: Boolean,
    },
    array: {
        required: true,
        type: Array,
    },
    selected_value: {
        required: true,
    }
})
defineEmits(['select','edit_on','remove'])
</script>
<style scoped>
.list-group-item {
    border-color: white !important;
}
.active {
    background-color: #1d92cf !important;
    border-color: #1d92cf !important;
}

.list-group-item:hover {
    background-color: #1d92cf !important;
    color: white !important;
    border-color: #1d92cf !important;
}

</style>
