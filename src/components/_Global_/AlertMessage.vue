<template>
<div v-if="alert_message !== null" class="alert fade show fixed-top mx-auto mt-2" :class="alert_status == 200 ? 'alert-success':'alert-danger'" style="width: 55%;">
    <strong>{{ alert_status == 200 ? 'Success!!!' : 'Error!!!' }}</strong> {{ alert_message }}
    <div class="spinner-border spinner-border-sm" role="status" v-if="alert_loading">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow spinner-grow-sm" role="status" v-if="alert_loading">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
</template>

<script setup>
import {
    useDataStore
} from '@/stores/data';
import {
    storeToRefs
} from 'pinia';

const store = useDataStore();
const {
    alert_status,
    alert_message,
    alert_loading
} = storeToRefs(store);
</script>
