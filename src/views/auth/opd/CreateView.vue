<template>
<LayoutFrame>
    <OpdCreate v-if="(data_store.auth_user.rank == 'admin' || data_store.auth_user.rank == 'doctor')" />
    <AuthBar :unauthorized="(data_store.auth_user.rank !== 'admin' && data_store.auth_user.rank !== 'doctor')"/>
</LayoutFrame>
</template>
<script setup>
import { useDataStore } from '@/stores/data';
import OpdCreate from '@/components/OPD/OpdCreate.vue'
import LayoutFrame from '@/components/_Global_/LayoutFrame.vue';
import AuthBar from '@/components/_Global_/AuthBar.vue';

const data_store = useDataStore();
</script>
    