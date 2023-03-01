<template>
 <div class="d-flex align-items-center justify-content-between">
    <h1>Transaction History</h1>
    <SearchableList 
        :path="['name']"
        :array="['All Branches',...branches]" 
        @select="select_branch" 
        :selected_val="selected_branch" 
        :placeholder="'All Branches'"
    />
</div>
<div :class="{'form-control': sale_records.length == 0 }">
    <DataTable
        :selected_row="selected_row"
        @select_row="select_row" 
        :array="sale_records" 
        :edit_row="false" 
        :searching="searching" 
        :not_found="not_found" 
        @begin_search="begin_search" 
        @pause_search="pause_search" 
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
import { 
    storeToRefs 
} from 'pinia';
import {
    onMounted,
} from 'vue';
import DataTable from '../components/_Global_/_data_table.vue';
import { 
    useDataStore 
} from '../stores/data';
import {
    useTransactionStore
} from '../stores/transactions.js';

const data_store = useDataStore()
const store = useTransactionStore()
const {
    selected_row,
    sale_records,
    branches,
    searching,
    not_found,
    selected_branch
} = storeToRefs(store)

const {
    initiate,
    select_row,
    begin_search,
    pause_search,
    select_branch,
} = store
const {
    content_loading
} = storeToRefs(data_store)

onMounted(async()=>{
    content_loading.value = true
    await initiate()
})
</script>
