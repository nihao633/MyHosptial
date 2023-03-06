<template>
<nav class="navbar navbar-expand-lg navbar-light fixed-top custom-bg shadow">
    <div class="container">
        <RouterLink class="navbar-brand custom-text-color" to="/">
            <i class="fa-solid fa-book-medical"></i>
            {{ auth_user ? auth_user.setting.hospital_name : $translate('default_hospital_name') }}
        </RouterLink>
        <li class="nav-item dropdown list-unstyled" v-if="!store.page_loading && store.auth_user">
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user d-lg-none"></i>
                <span class="d-none d-lg-inline">{{ auth_user.name }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg">
                <li>
                    <a class="dropdown-item disabled" href="javascript:void(0)">
                        {{ auth_user.rank.charAt(0).toUpperCase() + auth_user.rank.slice(1) }}
                        <span class="d-block d-lg-none"><small><em>({{ auth_user.name }})</em></small></span>
                    </a>
                </li>
                <li v-if="auth_user.rank == 'admin'"><RouterLink class="dropdown-item" to="/settings">{{ $translate('settings') }}</RouterLink></li>
                <li v-if="auth_user.rank == 'admin'"><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#reports" style="cursor:pointer;">{{ $translate('reports') }}</a></li>
                <li>
                    <a class="dropdown-item" href="#" @click="logout">{{ $translate('logout') }}</a>
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
<div class="modal fade" id="page_loading" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" >
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background: transparent; border: 0;">
            <div class="row align-items-baseline justify-content-center">
                <div class="col-1 text-end text-white">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div class="h5 col-2 px-0 text-white">
                    {{ $translate("loading") }}
                </div>
                <div class="text-center">
                    <img src="/images/loading.gif"/>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="service_unavailable" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" >
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background: transparent; border: 0;">
            <div class="row align-items-baseline justify-content-center">
                <UnavailableView />
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="disconnected" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content" style="background: transparent; border: 0;">
            <div class="row align-items-baseline justify-content-center">
                <div class="toast show px-0">
                    <div class="toast-header text-white shadow bg-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <strong class="me-auto">Oops!!!</strong>
                        <small>{{ auth_user?.setting.hospital_name }}</small>
                    </div>
                    <div class="toast-body shadow bg-white rounded-bottom">
                    {{ $translate('internet_lost_msg') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<select @change="set_locale()" class="position-fixed bottom-0 end-0 mb-3" style="z-index: 9999!important;" v-model="selected_locale">
    <option value="en">EN</option>
    <option value="mm">MM</option>
</select>
<div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 9999;">
  <div id="is_online" class="toast hide" data-bs-autohide="true" data-bs-delay="10000">
    <div class="toast-header text-white shadow bg-success">
        <i class="fa-solid fa-wifi me-2"></i>
        <strong class="me-auto">Hurray!!!</strong>
        <small>{{ auth_user?.setting.hospital_name }}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body shadow bg-white rounded-bottom">
      {{ $translate('internet_restore_msg') }}
    </div>
  </div>
</div>
<GenerateChart 
    :chart_id="'reports'"
    :title="'Statistics'"
/>
<FooterLayout :auth_user="auth_user" />
</template>

<script setup>
import GenerateChart from "../components/_Global_/GenerateChart.vue";
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
    onMounted,
    ref
} from 'vue';
import UnavailableView from "../views/guest/UnavailableView.vue";
import init from "../helpers/init";

const timer_id = ref(null);
const net_msg_shown = ref(true);
const is_online = ref(true);
const store = useDataStore();
const {
    selected_locale
} = storeToRefs(store);
const auth_store = useAuthStore();

watchEffect(()=>{
    store.page_loading ? $('#page_loading').modal('show') : $('#page_loading').modal('hide')
    if(is_online.value) {
        init.is_server_up.value ? $('#service_unavailable').modal('hide') : $('#service_unavailable').modal('show')
        $('#disconnected').modal('hide')
        if(!net_msg_shown.value){
            $('#is_online').toast('show')
            net_msg_shown.value = true
        }
    } 
    
    if(!is_online.value) {
        $('#disconnected').modal('show')
        $('#service_unavailable').modal('hide')
        net_msg_shown.value = false
    }
})

onMounted(()=>{
    $('#page_loading').modal('show');
    $('#service_unavailable').on('show.bs.modal',()=>{
        timer_id.value = setInterval(() => {
            init.initiate()
        }, 1000);
    });
    $('#service_unavailable').on('hide.bs.modal',()=>{
        if(timer_id.value) clearInterval(timer_id.value)
        if(is_online.value) window.location.reload()
    });
    $('#reports').on('hide.bs.modal',()=>{
        let container = document.getElementById('chart_container')
        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }    
        container.classList.add('d-none')
    })
    window.addEventListener('online',()=>is_online.value=true);
    window.addEventListener('offline',()=>is_online.value=false);
})

const { 
    auth_user,
} = storeToRefs(store);
const {
    logout
} = auth_store;

const set_locale = () => {
    let date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))

    document.cookie = `${encodeURIComponent('locale')}=${encodeURIComponent(selected_locale.value)}; expires=${date.toGMTString()}; path=/;`;
}
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
