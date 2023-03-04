<template>
    <TabLayout
        :is_pill="true"
        :array="tabs"
        :current_tab="current_tab"
        @select="val => {router.push('/pharmacy/' + links[val]);}"
    />
</template>

<script setup>
import {
    storeToRefs
} from 'pinia';
import {
    usePharmacyStore
} from '@/stores/pharmacy';
import TabLayout from '@/components/_Global_/TabLayout.vue';
import router from '@/router';
import { onMounted } from 'vue';

const tabs = ['Create','Dispense','P. Records','D. Records','Inventory'];
const links = ['create_purchase','create_dispense','purchase_records','dispense_records','inventory']
const store = usePharmacyStore();
const {
    current_tab
} = storeToRefs(store);

onMounted(()=>{
    const full_path = router.currentRoute.value.fullPath.split('/')
    current_tab.value = links.indexOf(full_path[full_path.length - 1].toLowerCase())
})
</script>
