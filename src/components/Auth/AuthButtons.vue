<template>
<div class="mb-3 d-flex">
    <div v-if="has_links">
        <span><small>
                <RouterLink :to="link_one">{{ link_one_description }}</RouterLink></small></span>
        <span class="d-block"><small>
                <RouterLink :to="link_two">{{ link_two_description }}</RouterLink></small></span>
    </div>
    <button class="btn btn-primary ms-auto h-100" type="submit">{{ button_name }}</button>
</div>
</template>
<script setup>
defineProps({
    has_links: {
        type: Boolean,
        default: false,
    },
    link_one: {},
    link_one_description: {},
    link_two: {},
    link_two_description: {},
    button_name: {},
})
</script>