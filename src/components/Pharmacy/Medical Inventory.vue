<template>
<div class="d-flex align-items-center">
    <SearchableList :path="['name']" :class="'mb-3'" :array="['All Branches',...branches]" @select="select_branch" :selected_val="selected_branch" :placeholder="'All Branches'" />
    <div class="mb-3 form-check ms-auto">
        <span class="form-label"><strong>Expired List</strong></span>
        <input type="checkbox" class="form-check-input" v-model="expired_list" @change="initiate_pharmacy_inventory">
    </div>
</div>
<DataTable :searching="searching" :not_found="not_found" @begin_search="begin_search" @pause_search="pause_search" :array="stock_report" :selected_row="selected_row" @select_row="select_row" v-if="!content_loading && stock_report.length !== 0" />
<div class="p-3 text-danger" v-if="!content_loading && stock_report.length == 0 && searching == null">
    There aren't any reports to display in the selected branch.
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
</template>

<script setup>
import SearchableList from './components/_searchable_list.vue';
import DataTable from './components/_data_table.vue';
import {
    usePharmacyStore
} from '../../stores/pharmacy';
import { useDataStore } from '../../stores/data';
import {
    storeToRefs
} from 'pinia';
import { ref,onMounted } from 'vue';
import init from '../../helpers/init';

const data = ref({});
const search_timer = ref('');
const data_store = useDataStore();
const store = usePharmacyStore();
const {
    initiate_pharmacy_inventory
} = store;
const {
    expired_list,
    stock_report,
    drugs,
    purchase_records,
    dispense_records,
    selected_branch,
    selected_row,
    branches,
    searching,
    not_found,
} = storeToRefs(store);
const {
    content_loading
} = storeToRefs(data_store)

const select_branch = async val => {
    selected_branch.value = ''
    data.branch_id = ''
    if(val !=='All Branches') selected_branch.value = val
    await initiate_pharmacy_inventory()
}

const select_row = (val) => {
    selected_row.value = val
}

const begin_search = (key,value) => {
    clearTimeout(search_timer.value)
    search_timer.value = setTimeout(async () => {
        data.value[key] = value
        data.value['branch_id'] = selected_branch.value
        data.value['expired_list'] = expired_list.value
        const res = await init.sendDataToServer('drug_stocks','post',data.value)
        searching.value = false

        if(res.data.stock_report.length == 0) return not_found.value = true

        stock_report.value = res.data.stock_report

        stock_report.value.forEach((value)=>{
            delete value.id
            selected_branch.value !== '' ? delete value.branch_name : null
            delete value.hospital_id
            delete value.branch_id
            delete value.deleted_at
            delete value.created_at
            delete value.updated_at
            delete value.purchased_voucher_id
        })

    }, 1000);
}

const pause_search = () => {
    searching.value = true
    not_found.value = false
    clearTimeout(search_timer.value)
}

onMounted(async () => {
    await initiate_pharmacy_inventory()
})
</script>
