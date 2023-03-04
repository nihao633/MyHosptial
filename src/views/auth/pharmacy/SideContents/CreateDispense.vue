<template>
<form @submit.prevent="submit_dispense()" v-if="!content_loading">
    <div class="row p-2">
        <div class="col-12 col-md-5 mb-md-3">
            <h3>From</h3>
            <label class="form-label">Main Store:</label>
            <SearchableList :path="['Brand Name','Generic Name','Drug Form','Drug Dosage']" :selected_val="selected_drug" @select="select_drug" :array="drugs" :class="'mb-3'"/>
            <div class="input-group mb-3">
            <span class="input-group-text">Amount</span>
            <input class="form-control" placeholder="Type Here" v-model="dispensed_amount">
        </div>
        </div>
        <div class="col mb-md-3 align-self-center">
            <p class="px-2 d-none d-md-block h1" style="font-size:xx-large;">&#8594 &#8594 &#8594</p>
            <p class="px-2 text-center d-block d-md-none h1" style="font-size:xx-large;">&#8595 &#8595 &#8595</p>
        </div>
        <div class="col-12 col-md-5 mb-3">
            <h3>To</h3>
            <label class="form-label">Sub-Branch:</label>
            <SearchableList :path="['name']" :not_found="not_found" :searching="searching" @select="select_branch" :selected_val="selected_branch" :array="branches"/>
        </div>
    </div>
    <div class="d-flex mb-3">
        <button class="btn btn-primary mx-auto">Dispense</button>
    </div>
</form>
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
import { usePharmacyStore } from '@/stores/pharmacy';
import { usePosStore } from '@/stores/pos';
import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import init from '@/helpers/init';

const pos_store = usePosStore();
const data_store = useDataStore();
const store = usePharmacyStore();
const {
    drugs,
    selected_drug,
    branches,
    selected_branch,
    dispensed_amount
} = storeToRefs(store);
const {
    not_found,
    searching
} = storeToRefs(pos_store)
const {
    content_loading
} = storeToRefs(data_store)
const {
    initiate_pharmacy_dispense_create,
} = store;

onMounted(async ()=>{
    
    await initiate_pharmacy_dispense_create()
})

const submit_dispense = async () => {
    const res = await init.sendDataToServer('dispense_record/create','post',{
        amount: dispensed_amount.value,
        drug_id: selected_drug.value.id,
        to: selected_branch.value.id,
    })

    if (res.message == 'Request failed with status code 500') return store.toggleAlert('Unknown Error!!!')

    if(res?.response?.data?.errors) {
        Object.entries(res?.response?.data?.errors).forEach(value =>{
            data_store.toggleAlert(value[1][0])
        })
        return;
    }

    data_store.toggleAlert(res.data.status,false,200)
    initiate_pharmacy_dispense_create()
}

const select_drug = val => selected_drug.value = val

const select_branch = val => selected_branch.value = val

</script>
