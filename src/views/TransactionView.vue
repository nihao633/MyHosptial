<template>
<h1>Transaction History</h1>
<div :class="{'form-control': sale_records.length == 0 }">
    <DataTable 
        :array="sale_records" 
        v-if="!content_loading && sale_records.length !== 0" 
    />
    <div class="p-3 text-danger" v-if="!content_loading && sale_records.length == 0 && searching == null">
        There aren't any transaction records to display in the selected store.
    </div>
    <div v-if="content_loading" class="p-2">
        <h6>
            Loading...
        </h6>
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import {
    onMounted
} from 'vue';
import DataTable from '../components/_Global_/_data_table.vue';
import { useDataStore } from '../stores/data';
import {
    useTransactionStore
} from '../stores/transactions.js';

const data_store = useDataStore()
const store = useTransactionStore()
const {
    transactions,
    sale_records
} = storeToRefs(store)
const {
    initiate
} = store
const {
    content_loading
} = storeToRefs(data_store)

onMounted(async () => {
    initiate()
})
</script>
