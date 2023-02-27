<template>
<AuthLayout>
    <ImageCard :image_path="'/images/login_banner.png'" :image_description="'Hospital Logo'" />
    <FormCard :class="'mt-xl-5 pt-xl-5'" :title="'REQUEST PASSWORD RESET'" @submit="request_password_reset">
        <AuthInput 
            :label="'Email:'"
            :required_label="true"
            v-model:input_value="email"
            :type="'email'"
            :placeholder="'name@example.com'"
            :error_message="error_message"
            @clear_error="()=>{error_message=null}"
            :disabled="data_store.content_loading"
        />
        <div class="mb-3 d-flex">
            <p class="text-danger" v-if="data_store.content_loading && store.reset_time !== ''"><em><small>Please wait before retrying in {{ store.reset_time }} seconds</small></em></p>
            <button class="btn btn-primary ms-auto h-100" type="submit" :disabled="data_store.content_loading">Request</button>
        </div>
    </FormCard>
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
import FormCard from '../components/Auth/FormCard.vue';
import AuthInput from '../components/_Global_/InputBox.vue';

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
