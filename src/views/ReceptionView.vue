<template>
<LayoutFrame :class="current_tab !== 2 ? 'px-5':'px-0'">
    <ReceptionRegister v-if="current_tab == 0" />
    <ReceptionAppointment v-if="current_tab == 1" />
    <ReceptionManage v-if="current_tab == 2" />
    <ReceptionFind v-if="current_tab == 3" />
</LayoutFrame>
</template>

<script setup>
import {
    useReceptionStore
} from '../stores/reception';
import {
    storeToRefs
} from 'pinia';
import ReceptionRegister from '../components/Reception/ReceptionRegister.vue'
import ReceptionAppointment from '../components/Reception/ReceptionAppointment.vue'
import ReceptionManage from  '../components/Reception/ReceptionManage.vue'
import ReceptionFind from '../components/Reception/ReceptionFind.vue'
import LayoutFrame from '../components/_Global_/LayoutFrame.vue';

const store = useReceptionStore();
const {
    current_tab
} = storeToRefs(store);
</script>
