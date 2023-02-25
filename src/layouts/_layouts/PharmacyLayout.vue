<template>
<div class="container mx-auto my-3 h-100">
    <div class="mb-5 py-3 border border-3 row">
        <div class="col-12 mb-3 col-md-3 col-lg-2">
            <TabLayout
                :is_pill="true"
                :array="tab_names"
                :current_tab="current_tab"
                @select="val => {current_tab = val}"
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

const tab_names = ['Create','Dispense','P. Records','D. Records','Inventory'];
const store = usePharmacyStore();
const {
    current_tab
} = storeToRefs(store);
</script>
