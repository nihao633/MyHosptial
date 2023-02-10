<template>
        <div class="modal fade" data-bs-backdrop="static" id="edit_dialog" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ edit_mode ? 'Edit' : 'View' }} {{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <p v-for="(value,key) in object"><strong><strong class="text-danger" v-if="edit_mode">*</strong>{{ key }}:&nbsp; </strong>{{ (edit_mode && key !== 'id') ? '' : value }}<input class="form-control" type="text" @input="$emit('edit',key,$event.target.value)" :value="value" v-if="edit_mode && key !== 'id'" @mousedown="$emit('remove_invalid_msg')"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('close')">Close</button>
                    <button type="button" class="btn btn-primary" v-if="edit_mode" @click="$emit('update')">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps(['edit_mode','title','object'])
defineEmits(['close','update','edit','remove_invalid_msg'])
</script>