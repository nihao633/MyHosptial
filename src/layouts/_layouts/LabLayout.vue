<template>
    <div class="container mx-auto" >
        <h1 class="my-4">Laboratory</h1>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" @click="current_tab = 0; reset()" :class="{ active: current_tab == 0 }" role="button">Create</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="current_tab = 1; reset()" :class="{ active: current_tab == 1 }" role="button">Manage</a>
            </li>
        </ul>
    </div>
    </template>
    
    <script setup>
    import { storeToRefs } from 'pinia';
    import {
        useOpdStore
    } from '../../stores/medicord';
    
    const store = useOpdStore();
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
