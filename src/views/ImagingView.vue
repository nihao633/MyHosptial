<template>
<LayoutFrame>
    <ImagingCreate v-if="current_tab == 0" />
    <ImagingManage v-if="current_tab == 1" />
</LayoutFrame>
    <div class="container mx-auto my-3">
        <div class="mb-5 col-lg-6">
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
import LayoutFrame from '../components/_Global_/LayoutFrame.vue';
    
    const data_store = useDataStore();
    const store = useOpdStore();
    const {
        current_tab
    } = storeToRefs(store);
    </script>
    