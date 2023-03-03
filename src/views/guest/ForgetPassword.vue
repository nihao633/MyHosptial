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
        />
        <div class="mb-3 d-flex">
            <button class="btn btn-primary ms-auto h-100" type="submit">Request</button>
        </div>
    </FormCard>
</AuthLayout>
</template>

<script setup>
import ImageCard from '../../components/Auth/ImageCard.vue';
import AuthLayout from '../../layouts/_layouts/AuthLayout.vue';
import {
    useAuthStore
} from '../../stores/auth';
import {
    storeToRefs
} from 'pinia';
import {
    onMounted
} from 'vue';
import FormCard from '../../components/Auth/FormCard.vue';
import AuthInput from '../../components/_Global_/InputBox.vue';

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
