<template>
<div class="modal" tabindex="-1" id="confirm_dialog">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><slot name="title" /></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" @click="$emit('confirm')">Confirm</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
defineEmits(['confirm'])
</script>
