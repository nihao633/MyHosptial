<template>
<div class="container mx-auto my-3" :class="current_tab !== 2 ? 'px-5':'px-0'">
    <div class="mb-5 col-lg-6">
        <ReceptionRegister v-if="current_tab == 0" />
        <ReceptionAppointment v-if="current_tab == 1" />
        <ReceptionManage v-if="current_tab == 2" />
        <ReceptionFind v-if="current_tab == 3" />
    </div>
</div>
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

const store = useReceptionStore();
const {
    current_tab
} = storeToRefs(store);
</script>
