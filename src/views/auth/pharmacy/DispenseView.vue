<template>
    <h1>Pharmacy</h1>
    <PharmacyLayout>
        <DispenseRecords />
    </PharmacyLayout>
</template>
<script setup>
import PharmacyLayout from '@/layouts/_layouts/PharmacyLayout.vue';
import DispenseRecords from '@/components/Pharmacy/DispenseRecords.vue';
</script>