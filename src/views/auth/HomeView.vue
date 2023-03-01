<template>
<div>
    <h1>Home</h1>
    <div class="mb-3">
        <strong>Current Date and Time:</strong> {{ init.current_time.value }}
    </div>
</div>
<main class="my-4 d-flex flex-wrap">
    <CardView 
        :image_path="'/images/reception.png'" 
        :title="'Reception'" 
        :description="'Manage Patient Information and Appointments'"
        :link="'/reception/register'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'reception')"
    />
    <CardView 
        :image_path="'/images/opd.png'" 
        :title="'Out Patient Department'" 
        :description="'Manage OPD Patient Records'"
        :link="'/opd/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse')"
    />
    <CardView 
        :image_path="'/images/ipd.png'" 
        :title="'Inpatient Department'" 
        :description="'Manage IPD Patient Records'"
        :link="'/ipd/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse')"
    />
    <CardView 
        :image_path="'/images/lab.png'" 
        :title="'Laboratory'" 
        :description="'Manage Lab Records'"
        :link="'/lab/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'lab technician')"
    />
    <CardView 
        :image_path="'/images/imaging.png'" 
        :title="'Imaging Services'" 
        :description="'Manage Imaging Records (E.g. X-ray, Ultrasound)'"
        :link="'/imaging/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'xray technician')"
    />
    <CardView 
        :image_path="'/images/pharmacy.jpg'" 
        :title="'Pharmacy'" 
        :description="'Manage Medical Stocks'"
        :link="'/pharmacy'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'pharmacist')"
    />
    <CardView 
        :image_path="'/images/pos_logo.png'" 
        :title="'Point of Sales'" 
        :description="'Print and Save Purchase Receipts'"
        :link="'/pos'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'cashier' || store.auth_user?.rank == 'accountant')"
    />
    <CardView
        :class="'mb-5 mb-md-0'" 
        :image_path="'/images/transaction.png'" 
        :title="'Transactions'" 
        :description="'Manage Transactions'"
        :link="'/transactions'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'accountant')"
    />
</main>
</template>

<script setup>
import { useDataStore } from '../../stores/data';
import init from '../../helpers/init';
import CardView from '../../components/Home/CardView.vue';

const store = useDataStore();
</script>
