<template>
    <h1>Pharmacy</h1>
    <PharmacyLayout>
        <PharmacyCreate v-if="current_tab == 0"/>
        <DispenseSubstores v-if="current_tab == 1" />
        <PurchaseRecords v-if="current_tab == 2" />
        <DispenseRecords v-if="current_tab == 3" />
        <MedicalInventory v-if="current_tab == 4" />
        <div v-if="current_tab == 5">
            Currently unavailable at the moment.
        </div>
        <!-- <ExportView v-if="current_tab == 5" /> -->
    </PharmacyLayout>
</template>
<script setup>
import PharmacyLayout from '../layouts/_layouts/PharmacyLayout.vue';
import PharmacyCreate from '../components/Pharmacy/PharmacyCreate.vue';
import PurchaseRecords from '../components/Pharmacy/PurchaseRecords.vue';
import DispenseRecords from '../components/Pharmacy/DispenseRecords.vue';
import DispenseSubstores from '../components/Pharmacy/DispenseSubstores.vue';
import MedicalInventory from '../components/Pharmacy/Medical Inventory.vue';
import ExportView from '../components/Pharmacy/ExportView.vue';
import {usePharmacyStore} from '../stores/pharmacy.js';
import { storeToRefs } from 'pinia';

const store = usePharmacyStore();
const { current_tab } = storeToRefs(store);
</script>