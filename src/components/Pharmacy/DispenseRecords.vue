<template>
<DataTable :disabled_list="['id','from','to']" @begin_edit="begin_edit" @pause_edit="pause_edit" :edit_row="edit_row" @edit_mode_on="edit_mode_on" :searching="searching" :not_found="not_found" @begin_search="begin_search" @pause_search="pause_search" :array="dispense_records" :selected_row="selected_row" @select_row="select_row" v-if="!content_loading" />
<div class="p-3 text-danger" v-if="!content_loading && dispense_records.length == 0 && searching == null">
    There aren't any drug purchase records to display in the main store.
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

const search_timer = ref('');
const data_store = useDataStore();
const store = usePharmacyStore();
const {
    selected_row,
    edit_row,
    dispense_records,
    branches,
    drugs,
    searching,
    not_found,
} = storeToRefs(store);
const {
    content_loading
} = storeToRefs(data_store)
const {
    initiate_dispense_records
} = store

onMounted(()=>{
    initiate_dispense_records()
})

const select_row = (val) => {
    selected_row.value = val
}

const edit_mode_on = () => {
    edit_row.value = true
}

const begin_search = (key,value) => {
    clearTimeout(search_timer.value)
    search_timer.value = setTimeout(async () => {
        const data = new Object();
        data[key] = value
        const res = await init.sendDataToServer('dispense_records','post',data)
        searching.value = false

        if(res.data.dispense_records.length == 0) return not_found.value = true
        if(res.data.drugs.length == 0) return not_found.value = true
        if(res.data.branches.length == 0) return not_found.value = true

        dispense_records.value = res.data.dispense_records
        drugs.value = res.data.drugs
        branches.value = res.data.branches

        let array = []
        dispense_records.value.forEach((value,index)=>{
            drugs.value.forEach((drug)=>{
                if(drug.id === value.drug_id) array.push({ ...drug,...dispense_records.value[index] })
            })
        })

        dispense_records.value = array

        dispense_records.value.forEach((value,index)=>{
            branches.value.forEach((branch)=>{
                if(branch.id === value.to) dispense_records.value[index].to = branch.name
                if(branch.id === value.from) dispense_records.value[index].from = branch.name
            })
        })

        dispense_records.value.forEach((value)=>{
            delete value.hospital_id
            delete value.drug_id
            delete value.deleted_at
            delete value.created_at
            delete value.updated_at
        })

    }, 1000);
}

const pause_search = () => {
    searching.value = true
    not_found.value = false
    clearTimeout(search_timer.value)
}

const begin_edit = async (key,value,key_code) => {
    clearTimeout(search_timer.value)
    search_timer.value = setTimeout(async () => {
        selected_row.value[key] = value
        if(key_code == "Enter") {
            edit_row.value = false
            await init.sendDataToServer('dispense_record/edit','post',selected_row.value)
            initiate_dispense_records()
        }
    }, 1000);
}

const pause_edit = () => {
    clearTimeout(search_timer.value)
}
</script>
