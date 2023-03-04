<template>
<form :id="id" class="modal" @submit.prevent="$emit('submit')">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ edit ? 'Set ' : '' + 'Resale Price for'}} {{ selected_branch.name }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="input-group mb-3">
                    <span class="input-group-text">Added Percentage:</span>
                    <input v-if="edit" id="price_percentage" type="text" class="form-control" placeholder="Type added percentage here" @input="$emit('update:percentage',$event.target.value)" :value="percentage">
                    <input class="form-control text-end" v-else :value="percentage" disabled>
                    <span class="input-group-text">%</span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" v-if="edit">Save changes</button>
            </div>
        </div>
    </div>
</form>
</template>
<script setup>
defineProps({
    selected_branch: {
        required: true,
    },
    percentage: {},
    id: {
        required: true,
        type: String,
    },
    edit: {
        type: Boolean,
        default: false,
    }
})
defineEmits(['submit','update:percentage'])
</script>
    