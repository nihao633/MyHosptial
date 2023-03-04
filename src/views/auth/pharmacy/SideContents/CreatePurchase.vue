<template>
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
<form class="px-0 px-md-4" @submit.prevent="create_record" v-else>
    <h5 class="my-3">New Purchase Record</h5>
    <div class="mb-3 form-check">
        <span class="form-label"><strong>Drug Name Exists?</strong></span>
        <input type="checkbox" class="form-check-input" v-model="drug_name_exists">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text">Upload Voucher</span>
        <input id="purchased_voucher" type="file" class="form-control">
    </div>
    <InputBoxes v-if="!drug_name_exists" :label_one="'Brand Name'" :label_two="'Generic Name'" v-model:input_one="brand_name" v-model:input_two="generic_name" />
    <InputBoxes v-if="!drug_name_exists" :label_one="'Drug Form'" :type_one="'list'" :array_one="['Oral','Injectable','Suppository','Ointment','Eye/Ear Drop','Instrument','Equipment','Others']" :label_two="'Drug Dosage'" v-model:input_one="drug_form" v-model:input_two="drug_dosage" />
    <SearchableList :path="['Brand Name','Generic Name','Drug Form','Drug Dosage']" :array="drugs" :selected_val="selected_drug" @select="select_drug" :class="'mb-3'" v-else />
    <InputBoxes :type_one="'date'" :label_one="'Date of Purchase'" :label_two="'Purchased Price'" v-model:input_one="purchased_date" v-model:input_two="purchased_price" />
    <InputBoxes :type_two="'date'" :label_one="'Purchased Quantity'" :label_two="'Expiry date'" v-model:input_one="purchased_quantity" v-model:input_two="expiry_date" />
    <div class="d-flex mb-3">
        <button class="btn btn-primary ms-auto" type="submit">
            Create
        </button>
    </div>
</form>
</template>

<script setup>
import InputBoxes from '@/components/Pharmacy/InputBoxes.vue';
import axios from 'axios';
import {
    usePharmacyStore
} from '@/stores/pharmacy';
import {
    storeToRefs
} from 'pinia';
import _searchable_list from '@/components/_Global_/_searchable_list.vue';
import {
    ref,
    onMounted
} from 'vue';
import { useDataStore } from '@/stores/data';

const drug_name_exists = ref(false)

const data_store = useDataStore()
const store = usePharmacyStore()
const {
    brand_name,
    generic_name,
    drug_form,
    drug_dosage,
    purchased_date,
    purchased_price,
    purchased_quantity,
    expiry_date,
    selected_drug,
    drugs
} = storeToRefs(store)

const {
    initiate_pharmacy_create
} = store

const {
    content_loading
} = storeToRefs(data_store)

onMounted(()=>{
    initiate_pharmacy_create()
})

const create_record = async () => {
    var formData = new FormData();
    var imagefile = document.querySelector('#purchased_voucher');
    formData.append("voucher", imagefile.files[0]);
    formData.append("is_new", !drug_name_exists.value);
    formData.append("Brand Name", brand_name.value.trim());
    formData.append("Generic Name", generic_name.value.trim());
    formData.append("Drug Form", drug_form.value.trim());
    formData.append("Drug Dosage", drug_dosage.value.trim());
    if(selected_drug.value !== '') formData.append('drug_id', selected_drug.value.id);
    formData.append("date_of_purchase", purchased_date.value);
    formData.append("purchased_price", purchased_price.value);
    formData.append("purchased_quantity", purchased_quantity.value);
    formData.append("expiry_date",expiry_date.value);

    axios.post('http://localhost:8000/purchased_records/create', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        document.getElementById('purchased_voucher').value = ''
        initiate_pharmacy_create()
        data_store.toggleAlert('Successfully created a new drug entry!!!',false,200)
    }).catch((err)=>{
        console.error(err.response.data.errors);
        Object.entries(err.response.data.errors).forEach(value =>{
            data_store.toggleAlert(value[1][0])
        })
    })
}

const select_drug = val => selected_drug.value = val
</script>
