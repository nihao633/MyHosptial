<template>
<nav class="navbar navbar-expand-lg navbar-light fixed-top custom-bg shadow">
    <div class="container">
        <RouterLink class="navbar-brand custom-text-color" to="/">
            <i class="fa-solid fa-book-medical"></i>
            {{ auth_user ? auth_user.setting.hospital_name : 'My Hospital EMRS' }}
        </RouterLink>
        <li class="nav-item dropdown list-unstyled" v-if="!store.page_loading && store.auth_user">
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ auth_user.name }}
            </a>
            <ul class="dropdown-menu shadow-lg">
                <li>
                    <a class="dropdown-item disabled" href="javascript:void(0)">
                        {{ auth_user.rank.charAt(0).toUpperCase() + auth_user.rank.slice(1) }}
                    </a>
                </li>
                <li v-if="auth_user.rank == 'admin'"><RouterLink class="dropdown-item" to="/settings">Settings</RouterLink></li>
                <li v-if="auth_user.rank == 'admin'"><RouterLink class="dropdown-item" to="/reports">Reports</RouterLink></li>
                <li>
                    <a class="dropdown-item" href="#" @click="logout">Log Out</a>
                </li>
            </ul>
        </li>
    </div>
</nav>
<div class="container mx-auto p-2 my-3" v-if="!store.page_loading">
    <div class="mt-5">
        <slot />
    </div>
</div>
<div class="modal" id="page_loading">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content" style="background: transparent; border: 0;">
            <div class="row align-items-baseline justify-content-center">
                <div class="col-1 text-end text-white">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div class="h5 col-2 px-0 text-white">
                    Loading...
                </div>
            </div>
        </div>
    </div>
</div>
<FooterLayout :auth_user="auth_user" />
</template>

<script setup>
import {
    RouterLink
} from "vue-router";
import {
    useDataStore
} from "@/stores/data";
import {
    useAuthStore
} from "../stores/auth";
import FooterLayout from "./_layouts/FooterLayout.vue";
import { 
    storeToRefs 
} from "pinia";
import {
    watchEffect,
    onMounted
} from 'vue';

const store = useDataStore();
const auth_store = useAuthStore();

watchEffect(()=>{
    store.page_loading ? $('#page_loading').modal('show') : $('#page_loading').modal('hide')
})

onMounted(()=>{
    $('#page_loading').modal('show')
})

const { auth_user } = storeToRefs(store);
const {
    logout
} = auth_store;
</script>

<style>
.form-input:checked {
    background-color: #1d92cf;
    border-color: #1d92cf;
}

.custom-bg {
    background: #2c3840 !important;
}

.custom-text-color {
    color: #DEE1E6 !important;
}

.custom-text-color:hover {
    color: #fff !important;
}

.form-control,.form-select,.alert,.badge ,.modal-content,.btn,.nav-link,.input-group-text,.list-group{
    border-radius: 0 !important;
}

.form-control:focus {
    border-color:grey !important;
    box-shadow: 0 0 0 0.25rem rgba(77, 80, 85, 0.25) !important;
}

.btn-primary {
    background: #1d92cf !important;
    color: #fff !important;
}

.btn {
    border: 0 !important;
    font-weight: bold !important;
}

.btn:hover {
    color: #DEE1E6 !important;
}

.card {
    border-radius: 0!important;
    background: #2c3840 !important;
    color: #fff !important;
}

@media only screen and (max-width: 576px) {
    .card {
        min-width: 32rem; 
        width: 32rem;
    }
}

@media only screen and (min-width: 576px) {
    .card {
        min-width: 30rem; 
        width: 30rem;
    }
}

@media only screen and (min-width: 768px) {
    .card {
        min-width: 21rem; 
        width: 21rem;
    }
}

@media only screen and (min-width: 992px) {
    .card {
        min-width: 18rem; 
        width: 18rem;
    }
}

form a {
    color: #1d92cf !important;
}

form a:hover {
    color: #0fa4f4 !important;
}

.dropdown-menu {
    background: #2c3840 !important;
    border-radius: 0 !important;
    padding: 0 !important;
}

.dropdown-item,.custom-select-button {
    color: #fff !important;
}

.btn-mine:hover,.custom-select-button:hover,.dropdown-item:hover {
    background: #759ab3 !important;
    color: #fff !important;
}

.disabled {
    color: grey !important;
}
</style>
