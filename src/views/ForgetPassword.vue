<template>
<AuthLayout>
    <ImageCard :image_path="'./src/assets/images/login_banner.png'" :image_description="'Hospital Logo'" />
    <div class="col-12 col-lg-8 col-xl-6 mt-xl-5 pt-xl-5">
        <h3>REQUEST PASSWORD RESET</h3>
        <form class="form-control my-3" @submit.prevent="request_password_reset">
            <div class="mb-3">
                <label for="email" class="form-label"><strong class="text-danger">*</strong>Email:</label>
                <input type="email" class="form-control" placeholder="name@example.com" v-model="email" @mousedown="error_message = null">
            </div>
            <div class="mb-3" v-if="error_message">
                <span class="text-white badge bg-danger">{{ error_message }}</span>
            </div>
            <div class="mb-3 d-flex">
                <p class="text-danger" v-if="data_store.content_loading && store.reset_time !== ''"><em><small>Please wait before retrying in {{ store.reset_time }} seconds</small></em></p>
                <button class="btn btn-primary ms-auto h-100" type="submit" :disabled="data_store.content_loading">Request</button>
            </div>
        </form>
    </div>
</AuthLayout>
</template>

<script setup>
import ImageCard from '../components/Auth/ImageCard.vue';
import AuthLayout from '../layouts/_layouts/AuthLayout.vue';
import {
    useAuthStore
} from '../stores/auth';
import {
    storeToRefs
} from 'pinia';
import {
    onMounted
} from 'vue';
import {
    useDataStore
} from './../stores/data';

const data_store = useDataStore();
const store = useAuthStore();
const {
    email,
    error_message
} = storeToRefs(store);
const {
    request_password_reset,
    reset
} = store;

onMounted(() => {
    reset()
})
</script>
