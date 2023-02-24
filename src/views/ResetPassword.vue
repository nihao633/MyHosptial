<template>
<AuthLayout>
    <ImageCard :image_path="'/images/login_banner.png'" :image_description="'Hospital Logo'" />
    <FormCard :class="'mt-xl-5 pt-xl-5'" :title="'RESET PASSWORD'" @submit="reset_password">
        <AuthInput 
            :label="'Your Email:'"
            v-model:input_value="email"
            @clear_error="reload()"
            :disabled="true"
        />
        <AuthInput 
            :label="'New Password:'"
            :required_label="true"
            v-model:input_value="password"
            :type="'password'"
            @clear_error="reload()"
            :error_message="error_message"
            :placeholder="'Type your new password here'"
        />
        <AuthInput 
            :label="'Confirm New Password:'"
            :required_label="true"
            :type="'password'"
            v-model:input_value="password_confirmation"
            @clear_error="reload()"
            :placeholder="'Type your new password here'"
        />
        <AuthButtons 
            :button_name="'Reset'"
        />
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
import { useRoute } from 'vue-router';
import FormCard from '../components/Auth/FormCard.vue';
import AuthInput from '../components/Auth/AuthInput.vue';
import AuthButtons from '../components/Auth/AuthButtons.vue';

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
    error_message.value = null
    email.value = route.query.email
    token.value = route.query.token
}
onMounted(() => {
    reset()
    reload()
})
</script>
