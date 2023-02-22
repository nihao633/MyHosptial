<template>
<LayoutFrame>
    <IpdCreate v-if="current_tab == 0 && (data_store.auth_user.rank == 'admin' || data_store.auth_user.rank == 'doctor')" />
    <AuthBar :unauthorized="current_tab == 0 && (data_store.auth_user.rank !== 'admin' && data_store.auth_user.rank !== 'doctor')" />
    <IpdManage v-if="current_tab == 1" />
</LayoutFrame>
</template>

<script setup>
import { useDataStore } from '../stores/data';
import {
    useOpdStore
} from '../stores/medicord';
import {
    storeToRefs
} from 'pinia';
import IpdCreate from '../components/IPD/IpdCreate.vue'
import IpdManage from '../components/IPD/IpdManage.vue'
import LayoutFrame from '../components/_Global_/LayoutFrame.vue';
import AuthBar from '../components/_Global_/AuthBar.vue';

const data_store = useDataStore();
const store = useOpdStore();
const {
    current_tab
} = storeToRefs(store);
</script>
