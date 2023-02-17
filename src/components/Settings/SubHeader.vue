<template>
<div class="align-items-center justify-content-between mb-3" :class="button_name_two == 'Set Consultant Date' ? 'd-block d-md-flex' : 'd-flex'">
    <h6><strong>{{ title }}</strong></h6>
    <button class="btn btn-primary" v-if="button_name_two == 'Set Consultant Date'" @click="$emit('click_two')">{{ button_name_two }}</button>
    <RouterLink class="btn btn-primary" :to="route_path" v-if="route_path == '/register'">{{ button_name }}</RouterLink>
    <button :class="button_name_two == 'Set Consultant Date' ? 'float-end' : ''" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="route_path" @click="$emit('create_mode',title)" v-else>{{ button_name }}</button>
</div>
<div class="form-control mb-3">
    <slot>Add Content Here</slot>
</div>
</template>
<script setup>
defineProps(['route_path','title','button_name','button_name_two'])
defineEmits(['create_mode','click_two'])
</script>
