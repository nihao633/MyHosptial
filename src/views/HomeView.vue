<template>
<div>
    <h1>Home</h1>
    <div class="mb-3">
        <strong>Current Date and Time:</strong> {{ init.current_time.value }}
    </div>
</div>
<main class="my-4 d-flex flex-wrap">
    <div class="card ms-2 mt-2">
        <img src="../assets/images/reception.png" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Reception</h5>
            <p class="card-text">Manage Patient Information and Appointments</p>
            <RouterLink to="/reception" class="btn btn-primary"  :style="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'reception') ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'reception') ? 'Click Here >>' : 'Unauthorized'}}</RouterLink>
        </div>
    </div>
    <div class="card ms-2 mt-2">
        <img src="../assets/images/opd.png" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Out Patient Department</h5>
            <p class="card-text">Manage OPD Patient Records</p>
            <RouterLink to="/opd" class="btn btn-primary" :style="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse') ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse') ? 'Click Here >>' : 'Unauthorized'}}</RouterLink>
        </div>
    </div>
    <div class="card ms-2 mt-2">
        <img src="../assets/images/ipd.png" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Inpatient Department</h5>
            <p class="card-text">Manage IPD Patient Records</p>
            <RouterLink to="/ipd" class="btn btn-primary" :style="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse') ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse') ? 'Click Here >>' : 'Unauthorized'}}</RouterLink>
        </div>
    </div>
    <div class="card ms-2 mt-2">
        <img src="../assets/images/lab.png" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Laboratory</h5>
            <p class="card-text">Manage Lab Records</p>
            <RouterLink to="/lab" class="btn btn-primary"  :style="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'lab technician') ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'lab technician') ? 'Click Here >>' : 'Unauthorized'}}</RouterLink>
        </div>
    </div>
    <div class="card ms-2 mt-2">
        <img src="../assets/images/imaging.png" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Imaging Services</h5>
            <p class="card-text">Manage Imaging Records (E.g. X-ray, Ultrasound)</p>
            <RouterLink to="/imaging" class="btn btn-primary"  :style="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'xray technician') ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'xray technician') ? 'Click Here >>' : 'Unauthorized'}}</RouterLink>
        </div>
    </div>
    <div class="card ms-2 mt-2">
        <img src="../assets/images/pharmacy.jpg" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Pharmacy</h5>
            <p class="card-text">Manage Medical Stock</p>
            <RouterLink to="/pharmacy" class="btn btn-primary" :style="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'pharmacist') ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'pharmacist') ? 'Click Here >>' : 'Unauthorized'}}</RouterLink>
        </div>
    </div>
    <div class="card ms-2 mt-2">
        <img src="../assets/images/pos_logo.png" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Point of Sales</h5>
            <p class="card-text">Manage cash flow regarding selling medicine and clinical consultations</p>
            <RouterLink to="/pos" class="btn btn-primary"  :style="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'cashier' || store.auth_user?.rank == 'accountant') ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'cashier' || store.auth_user?.rank == 'accountant') ? 'Click Here >>' : 'Unauthorized'}}</RouterLink>
        </div>
    </div>
</main>
</template>

<script setup>
import { useDataStore } from '../stores/data';
import init from '../helpers/init';

const store = useDataStore();
</script>
