<template>
<div class="container mx-auto my-3 h-100">
    <div class="mb-5 py-3 border border-3 row">
        <div class="col-12 mb-3 col-md-3 col-lg-2">
            <TabLayout
                :is_pill="true"
                :array="tabs"
                :current_tab="current_tab"
                @select="val => {router.push('/pharmacy/' + links[val]);}"
            />
        </div>
        <div class="col col-md-9 col-lg-10">
            <div class="form-control shadow">
                <slot />
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import {
    storeToRefs
} from 'pinia';
import {
    usePharmacyStore
} from '../../stores/pharmacy';
import TabLayout from '../../components/_Global_/TabLayout.vue';
import router from '../../router';
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
