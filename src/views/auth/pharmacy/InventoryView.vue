<template>
    <h1>Pharmacy</h1>
    <PharmacyLayout>
        <MedicalInventory />
    </PharmacyLayout>
</template>
<script setup>
import PharmacyLayout from '@/layouts/_layouts/PharmacyLayout.vue';
import MedicalInventory from '@/components/Pharmacy/Medical Inventory.vue';
</script>