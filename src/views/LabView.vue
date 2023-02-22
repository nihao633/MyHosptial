<template>
<LayoutFrame>
    <LabCreate v-if="current_tab == 0" />
    <LabManage v-if="current_tab == 1" />
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
    import LabCreate from '../components/Lab/LabCreate.vue'
    import LabManage from '../components/Lab/LabManage.vue'
import LayoutFrame from '../components/_Global_/LayoutFrame.vue';
    
    const data_store = useDataStore();
    const store = useOpdStore();
    const {
        current_tab
    } = storeToRefs(store);
    </script>
    