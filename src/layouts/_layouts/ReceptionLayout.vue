<template>
<div class="container mx-auto" >
    <h1 class="my-4">Reception</h1>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" @click="current_tab = 0; reset()" :class="{ active: current_tab == 0 }" role="button">Register</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" @click="current_tab = 1; reset()" :class="{ active: current_tab == 1 }" role="button">Appointment</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" @click="current_tab = 2; reset()" :class="{ active: current_tab == 2 }" role="button">Manage</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" @click="current_tab = 3; reset()" :class="{ active: current_tab == 3 }" role="button">Find</a>
        </li>
    </ul>
</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useReceptionStore } from '../../stores/reception';

const store = useReceptionStore();
const { current_tab } = storeToRefs(store);
const { reset } = store;
</script>

<style scoped>
a {
    color: #1d92cf !important;
}

a:hover {
    border-radius: 0 !important;
}

.active {
    color: grey !important;
    border-radius: 0 !important;
}
</style>