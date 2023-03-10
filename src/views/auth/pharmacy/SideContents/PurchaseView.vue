<template>
<DataTable 
    :disabled_list="['id','Purchased Quantity','Purchased Price','Purchased Date','Expiry Date']" 
    :search_only="['id','Purchased Quantity','Purchased Price','Purchased Date','Expiry Date']"
    @begin_edit="begin_edit" 
    @pause_edit="pause_edit" 
    :edit_row="edit_row" 
    @edit_mode_on="edit_mode_on" 
    :searching="searching" 
    :not_found="not_found" 
    @begin_search="begin_search" 
    @pause_search="pause_search" 
    :array="purchase_records" 
    :selected_row="selected_row" 
    @select_row="select_row" 
    v-if="!content_loading && purchase_records.length !== 0"
/>
<div class="p-3 text-danger" v-if="!content_loading && purchase_records.length == 0 && searching == null">
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
import DataTable from '@/components/_Global_/_data_table.vue';
import {
    usePharmacyStore
} from '@/stores/pharmacy';
import { 
    useDataStore 
} from '@/stores/data';
import { usePosStore } from '@/stores/pos';
import {
    storeToRefs
} from 'pinia';
import { ref,onMounted } from 'vue';
import init from '@/helpers/init';

const search_timer = ref('');
const pos_store = usePosStore();
const data_store = useDataStore();
const store = usePharmacyStore();
const {
    selected_row,
    edit_row,
    purchase_records,
    drugs,
} = storeToRefs(store);
const {
    content_loading
} = storeToRefs(data_store)
const {
    searching,
    not_found
} = storeToRefs(pos_store)
const {
    initiate_purchase_records
} = store

onMounted(()=>{
    initiate_purchase_records()
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
        const res = await init.sendDataToServer('purchase_records','post',data)
        searching.value = false

        if(key == 'id' && value == 0 && value !== '') return not_found.value = true
        if(res.data.purchase_records.length == 0) return not_found.value = true
        if(res.data.drugs.length == 0) return not_found.value = true

        purchase_records.value = res.data.purchase_records
        drugs.value = res.data.drugs

        purchase_records.value.forEach((value,index)=>{
            drugs.value.forEach((drug,)=>{
                if(drug.id === value.drug_id) purchase_records.value[index] = { 
                        ...{id: value.id},
                        ...{
                                'Brand Name': drug['Brand Name'],
                                'Generic Name': drug['Generic Name'],
                                'Drug Form': drug['Drug Form'],
                                'Drug Dosage': drug['Drug Dosage']
                            },
                        ...{
                                'Purchased Date': value['Purchased Date'],
                                'Purchased Price': value['Purchased Price'], 
                                'Purchased Quantity': value['Purchased Quantity'], 
                                'Expiry Date': value['Expiry Date'] 
                            } 
                    }
            })
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
            await init.sendDataToServer('purchase_records/edit','post',selected_row.value)
            initiate_purchase_records()
        }
    }, 1000);
}

const pause_edit = () => {
    clearTimeout(search_timer.value)
}
</script>
