<template>
<div class="row my-3 mx-0 mx-sm-5 d-block d-xl-flex">
    <div class="col-6">
        <img src="../assets/images/login_banner.png" class="d-none d-xl-block" alt="..." />
    </div>
    <div class="col-12 col-lg-8 col-xl-6">
        <h1>
            STAFF REGISTER
        </h1>
        <form class="form-control" @submit.prevent="register">
            <div class="mb-3">
                <label for="email" class="form-label"><strong class="text-danger">*</strong>Email:</label>
                <input type="email" class="form-control" name="email" placeholder="name@example.com" v-model="email" @mousedown="invalid_email_msg = null">
            </div>
            <div class="mb-3" v-if="invalid_email_msg">
                <span class="text-white badge bg-danger">{{ invalid_email_msg }}</span>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label"><strong class="text-danger">*</strong>Name:</label>
                <input type="name" class="form-control" name="name" placeholder="John Smith" v-model="name" @mousedown="invalid_name_msg = null">
            </div>
            <div class="mb-3" v-if="invalid_name_msg">
                <span class="text-white badge bg-danger">{{ invalid_name_msg }}</span>
            </div>
            <div class="mb-3">
                <label class="form-label" for="rank"><strong class="text-danger">*</strong>Rank</label>
                <li class="dropdown list-unstyled">
                    <button type="button" class="dropdown-toggle text-secondary form-control text-start" :class="rank == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                        {{ rank == '' ? 'Choose your staff name' : rank.charAt(0).toUpperCase() + rank.slice(1) }}
                    </button>
                    <ul id="select_rank" class="dropdown-menu form-control" style="overflow: auto;" :style="ranks.length > 3 ? 'height:200px;' : ''">
                        <li role="button" class="p-3 custom-select-button" v-for="rank in ranks" @click="select_rank(rank)">{{ rank.charAt(0).toUpperCase() + rank.slice(1) }}</li>
                    </ul>
                </li>
            </div>
            <div class="mb-3" v-if="rank !== 'admin'">
                <label class="form-label" for="rank"><strong class="text-danger">*</strong>Branch</label>
                <li class="dropdown list-unstyled" v-if="!content_loading">
                    <button type="button" class="dropdown-toggle text-secondary form-control text-start" :class="branch == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                        {{ branch == '' ? 'Choose branch' : branch.name.charAt(0).toUpperCase() + branch.name.slice(1) }}
                    </button>
                    <ul id="select_branch" class="dropdown-menu form-control" style="overflow: auto;" :style="branches.length > 3 ? 'height:200px;' : ''">
                        <li role="button" class="p-3 custom-select-button" v-for="branch in branches" @click="select_branch(branch)">{{ branch.name.charAt(0).toUpperCase() + branch.name.slice(1) }}</li>
                    </ul>
                </li>
                <div v-else>Loading...</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label"><strong class="text-danger">*</strong>Password:</label>
                <input type="password" class="form-control" name="password" v-model="password" @mousedown="invalid_password_msg = null">
            </div>
            <div class="mb-3" v-if="invalid_password_msg">
                <span class="text-white badge bg-danger">{{invalid_password_msg}}</span>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label"><strong class="text-danger">*</strong>Confirm Password:</label>
                <input type="password" class="form-control" name="password_confirmation" v-model="password_confirmation" @mousedown="invalid_password_msg = null">
            </div>
            <div class="mb-3 d-flex">
                <div>
                    <span><small>
                            <RouterLink to="/login">Already registered?<br> Please sign in here.</RouterLink>
                        </small></span>
                </div>
                <button class="btn btn-primary ms-auto h-100" type="submit">Register</button>
            </div>
        </form>
    </div>
</div>
</template>
<script setup>
import { useDataStore } from "../stores/data";
import { useRegisterStore } from "../stores/register";
import { storeToRefs } from "pinia";
import { onMounted,ref } from "vue";
import init from "../helpers/init";

const ranks = ['admin','accountant','cashier','doctor','nurse','pharmacist','lab technician','reception']
const branches = ref([]);
const store = useRegisterStore();
const data_store = useDataStore();
const { email,name,rank,branch,password,password_confirmation,invalid_email_msg,invalid_name_msg,invalid_password_msg } = storeToRefs(store);
const { register } = store;
const { content_loading } = storeToRefs(data_store);

const select_rank = val => {
    rank.value = val
    $('#select_rank').dropdown('toggle') 
}

const select_branch = val => {
    branch.value = val
    $('#select_branch').dropdown('toggle') 
}

onMounted(async ()=>{
    content_loading.value = true
    const res = await init.sendDataToServer('branches','post')
    content_loading.value = false
    branches.value = res.data.branches
})
</script>
