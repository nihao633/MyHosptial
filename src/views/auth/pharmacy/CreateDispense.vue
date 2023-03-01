<template>
    <h1>Pharmacy</h1>
    <PharmacyLayout>
        <DispenseSubstores />
    </PharmacyLayout>
</template>
<script setup>
import PharmacyLayout from '@/layouts/_layouts/PharmacyLayout.vue';
import DispenseSubstores from '@/components/Pharmacy/DispenseSubstores.vue';
</script>