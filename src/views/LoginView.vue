<template>
<AuthLayout :class="'align-items-center'">
  <ImageCard :image_path="'/images/login_banner.png'" :image_description="'Hospital Logo'" />
  <FormCard :title="'STAFF LOGIN'" @submit="login">
    <AuthInput 
      :required_label="true" 
      :label="'Email:'" 
      :type="'email'"
      :placeholder="'name@example.com'"
      v-model:input_value="email"
      @clear_error="()=>{error_message = ''}"
    />
    <AuthInput 
      :required_label="true" 
      :label="'Password:'"
      :type="'password'"
      :error_message="error_message"
      :placeholder="'Type your password here'"
      v-model:input_value="password"
      @clear_error="()=>{error_message = ''}"
    />
    <AuthButtons
      :has_links="true"
      :link_one="'/forget-password'"
      :link_one_description="'Forgot your password?'"
      :link_two="'/register'"
      :link_two_description="'Not a user? Please register here.'"
      :button_name="'Log In'"
    />
  </FormCard>
</AuthLayout>
</template>

<script setup>
import AuthLayout from '../layouts/_layouts/AuthLayout.vue';
import { 
  useAuthStore 
} from '../stores/auth';
import { 
  storeToRefs 
} from 'pinia';
import ImageCard from '../components/Auth/ImageCard.vue';
import FormCard from '../components/Auth/FormCard.vue';
import AuthInput from '../components/_Global_/InputBox.vue';
import AuthButtons from '../components/Auth/AuthButtons.vue';

const store = useAuthStore();
const { 
  email,
  password,
  error_message
} = storeToRefs(store);
const { 
  login 
} = store;
</script>
