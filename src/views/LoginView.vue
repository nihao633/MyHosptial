<template>
  <div class="row mx-0 mx-sm-5 d-block d-xl-flex align-items-center custom-login">
    <div class="col-6">
        <img src="../assets/images/login_banner.png" class="d-none d-xl-block custom-logo" alt="..." />
    </div>
    <div class="col-12 col-lg-8 col-xl-6">
      <h1>STAFF LOGIN</h1>
        <form class="form-control my-3" @submit.prevent="login">
            <div class="mb-3">
                <label for="email" class="form-label"><strong class="text-danger">*</strong>Email:</label>
                <input type="email" class="form-control" placeholder="name@example.com" v-model="email" @mousedown="error_message = null">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label"><strong class="text-danger">*</strong>Password:</label>
                <input type="password" class="form-control" v-model="password">
            </div>
            <div class="mb-3" v-if="error_message">
                <span class="text-white badge bg-danger">{{ error_message }}</span>
            </div>
            <div class="mb-3 d-flex">
                <div>
                    <span><small>
                            <RouterLink to="/forget-password">Forgot your password?</RouterLink></small></span>
                    <span class="d-block"><small>
                            <RouterLink to="/register">Not a user? Please register here.</RouterLink></small></span>
            </div>
          <button class="btn btn-primary ms-auto h-100" type="submit">Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

const store = useAuthStore();
const { email,password, error_message } = storeToRefs(store);
const { login } = store;
</script>
