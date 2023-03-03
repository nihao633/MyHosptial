<template>
    <div>
        <div class="mb-3">
            <label class="form-label"><strong class="text-danger" v-if="required_label">*</strong>{{ label }}</label>
            <input :id="id" :type="type" class="form-control" :placeholder="placeholder" :value="input_value" @input="$emit('update:input_value',$event.target.value)" @mousedown="$emit('clear_error')" :disabled="disabled">
        </div>
        <div class="mb-3" v-if="error_message">
            <span class="text-white badge bg-danger">{{ error_message }}</span>
        </div>
    </div>
</template>
<script setup>
defineProps({
    id: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        required: true,
    },
    required_label: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: 'Type here'
    },
    error_message: {
        type: String,
        default: '',
    },
    input_value: {}
})

defineEmits(['update:input_value','clear_error'])
</script>