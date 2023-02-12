<template>
<form id="select_date" class="modal" @submit.prevent="$emit('submit')">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Set Available Date for {{ selected_consultant.name }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label class="form-label">Set Available Date</label>
                <input id="date_selector" type="date" class="form-control" @input="array.push($event.target.value)">
                <div class="form-control mt-3">
                    <label class="form-label"><strong>Selected Dates:</strong></label>
                    <slot />
                </div>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</form>
</template>
<script setup>
defineProps({
    array: {
        required: true,
        type: Array,
    },
    selected_consultant: {
        required: true,
    }
})
defineEmits(['submit'])
</script>
