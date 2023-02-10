<template>
<div class="modal fade" data-bs-backdrop="static" id="create_dialog" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="input-group mb-3" v-for="value in array">
                    <span class="input-group-text">{{ value.split('_').length == 1 ? value.charAt(0).toUpperCase() + value.slice(1) : make_uppercase(value) }}</span>
                    <input type="text" class="form-control" @input="$emit('input_data',value,$event.target.value)">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="$emit('create')">Create</button>
            </div>
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

defineProps(['title','array'])
defineEmits(['create','input_data'])
</script>
