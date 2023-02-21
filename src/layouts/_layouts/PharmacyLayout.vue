<template>
<div class="container mx-auto my-3 h-100">
    <div class="mb-5 py-3 border border-3 row">
        <div class="col-12 mb-3 col-md-3 col-lg-2">
            <SearchableList :selected_val="tab_names[current_tab]" @select="select_tab" :array="tab_names" :class="'d-md-none'"/>
            <ul class="nav nav-pills flex-row flex-md-column d-none d-md-flex">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: current_tab == 0}" href="javascript:void(0)" @click="current_tab = 0;">Create</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: current_tab == 1}" href="javascript:void(0)" @click="current_tab = 1;">Dispense</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: current_tab == 2}" href="javascript:void(0)" @click="current_tab = 2;">P. Records</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: current_tab == 3}" href="javascript:void(0)" @click="current_tab = 3">D. Records</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: current_tab == 4}" href="javascript:void(0)" @click="current_tab = 4">Inventory</a>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" :class="{ active: current_tab == 5}" href="javascript:void(0)" @click="current_tab = 5">Export</a>
                </li> --> <!-- will implement later -->
            </ul>
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
import SearchableList from '../../components/_Global_/_searchable_list.vue';
import {
    storeToRefs
} from 'pinia';
import {
    usePharmacyStore
} from '../../stores/pharmacy';

const tab_names = ['New Purchase Record','New Dispense Record','Purchase Records','Dispense Records','Inventory','Export'];
const store = usePharmacyStore();
const {
    current_tab
} = storeToRefs(store);
const select_tab = val => {
    current_tab.value = tab_names.indexOf(val)
}
</script>

<style scoped>
.active {
    background-color: #1d92cf !important;
    border: 0 !important;
}

.nav-link {
    color: black;
}

.nav-link:hover {
    background: grey !important;
    color: white !important;
}
</style>
