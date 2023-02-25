<template>
<TabLayout
    :title="'Reception'"
    :array="[
        'Register',
        'Appointment',
        'Manage',
        'Find'
    ]"
    @select="(val)=>{current_tab=val;reset();}"
    :current_tab="current_tab"
/>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useReceptionStore } from '../../stores/reception';
import TabLayout from '../../components/_Global_/TabLayout.vue';

const store = useReceptionStore();
const { 
    current_tab 
} = storeToRefs(store);
const { 
    reset
} = store;
</script>
