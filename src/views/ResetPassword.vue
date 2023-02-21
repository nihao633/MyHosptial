<template>
<AuthLayout>
    <ImageCard :image_path="'./src/assets/images/login_banner.png'" :image_description="'Hospital Logo'" />
    <div class="col-12 col-lg-8 col-xl-6 mt-xl-5 pt-xl-5">
        <h1>RESET PASSWORD</h1>
        <form class="form-control my-3" @submit.prevent="reset_password">
            <div class="mb-3">
                <label for="email" class="form-label">Your Email:</label>
                <input type="email" class="form-control" v-model="email" @change=reload() disabled>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label"><strong class="text-danger">*</strong>New Password:</label>
                <input type="password" class="form-control" placeholder="Type your new password here" v-model="password" @change=reload()>
            </div>
            <div class="mb-3">
                <label for="password_confirmation" class="form-label"><strong class="text-danger">*</strong>Confirm New Password:</label>
                <input type="password" class="form-control" placeholder="Type your new password here" v-model="password_confirmation" @change=reload()>
            </div>
            <div class="mb-3" v-if="error_message">
                <span class="text-white badge bg-danger">{{ error_message }}</span>
            </div>
            <div class="mb-3 d-flex">
                <button class="btn btn-primary ms-auto h-100" type="submit">Reset</button>
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
import { useRoute } from 'vue-router';

const store = useAuthStore();
const {
    email,
    password,
    password_confirmation,
    token,
    error_message
} = storeToRefs(store);
const {
    reset_password,
    reset
} = store;
const route = useRoute();

const reload = () => {
    email.value = route.query.email
    token.value = route.query.token
}
onMounted(() => {
    reset()
    reload()
})
</script>
