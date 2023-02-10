<template>
    <div class="container mx-auto my-3">
        <div class="mb-5 col-lg-6">
            <ImagingCreate v-if="current_tab == 0 && (data_store.auth_user.rank == 'admin' || data_store.auth_user.rank == 'doctor')" />
            <div v-if="current_tab == 0 && (data_store.auth_user.rank !== 'admin' && data_store.auth_user.rank !== 'doctor')">
                You don't have enough priviledge to create a new medical record.
            </div>
            <ImagingManage v-if="current_tab == 1" />
        </div>
    </div>
    </template>
    
    <script setup>
    import { useDataStore } from '../stores/data';
    import {
        useOpdStore
    } from '../stores/medicord';
    import {
        storeToRefs
    } from 'pinia';
    import ImagingCreate from '../components/Imaging/ImagingCreate.vue'
    import ImagingManage from '../components/Imaging/ImagingManage.vue'
    
    const data_store = useDataStore();
    const store = useOpdStore();
    const {
        current_tab
    } = storeToRefs(store);
    </script>
    