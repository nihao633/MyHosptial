<template>
<div>
    <h1>{{ $translate('home') }}</h1>
    <div class="mb-3">
        <strong>{{ $translate('current_time') }}</strong> {{ init.current_time.value }}
    </div>
</div>
<main class="my-4 d-flex flex-wrap">
    <CardView 
        :image_path="'/images/reception.png'" 
        :title="$translate('reception')" 
        :description="$translate('reception_desc')"
        :link="'/reception/register'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'reception')"
    />
    <CardView 
        :image_path="'/images/opd.png'" 
        :title="$translate('opd')" 
        :description="$translate('opd_desc')"
        :link="'/opd/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse')"
    />
    <CardView 
        :image_path="'/images/ipd.png'" 
        :title="$translate('ipd')" 
        :description="$translate('ipd_desc')"
        :link="'/ipd/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'doctor' || store.auth_user?.rank == 'nurse')"
    />
    <CardView 
        :image_path="'/images/lab.png'" 
        :title="$translate('lab')" 
        :description="$translate('lab_desc')"
        :link="'/lab/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'lab technician')"
    />
    <CardView 
        :image_path="'/images/imaging.png'" 
        :title="$translate('imaging')" 
        :description="$translate('imaging_desc')"
        :link="'/imaging/create'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'xray technician')"
    />
    <CardView 
        :image_path="'/images/pharmacy.jpg'" 
        :title="$translate('pharmacy')" 
        :description="$translate('pharmacy_desc')"
        :link="'/pharmacy/create_purchase'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'pharmacist')"
    />
    <CardView 
        :image_path="'/images/pos_logo.png'" 
        :title="$translate('pos')" 
        :description="$translate('pos_desc')"
        :link="'/pos'"
        :authorized="(store.auth_user?.rank == 'admin' || store.auth_user?.rank == 'cashier' || store.auth_user?.rank == 'accountant')"
    />
    <CardView
        :class="'mb-5 mb-md-0'" 
        :image_path="'/images/transaction.png'" 
        :title="$translate('transactions')" 
        :description="$translate('transactions_desc')"
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
