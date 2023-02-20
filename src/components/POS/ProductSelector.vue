<template>
<form class="mb-3 px-5 py-5" @submit.prevent="addToCart">
    <div class="mb-3">
        <label class="form-label">Add to Cart by</label>
        <SearchableList :array="['ID','List']" @select="select_method" :selected_val="current_method" />
    </div>
    <div class="mb-3" v-if="current_method == 'ID'">
        <label class="form-label"><strong class="text-danger">*</strong> ID</label>
        <input type="text" class="form-control" placeholder="Type the drug ID here" v-model.number="current_id">
    </div>
    <div class="mb-3" v-if="current_method == 'List'">
        <label class="form-label"><strong class="text-danger">*</strong> Category</label>
        <SearchableList @select="select_category" :selected_val="current_category" :array="['Oral','Injectable','Suppository','Ointment','Eye/Ear Drop','Instrument','Equipment','Others']" :placeholder="'Choose category'" />
    </div>
    <div class="mb-3" v-if="current_category !== ''">
        <label class="form-label"><strong class="text-danger">*</strong> Generic Name</label>
        <SearchableList :array="generic_names" @select="select_generic_name" :selected_val="current_generic_name" :path="['Generic Name']"/>
    </div>
    <div class="mb-3" v-if="current_generic_name !== ''">
        <label class="form-label"><strong class="text-danger">*</strong> Brand Name</label>
        <SearchableList :selected_val="current_brand_name" @select="select_brand_name" :array="drugs" :path="['Brand Name']" />
    </div>
    <div class="mb-3" v-if="current_brand_name !== '' || current_id !== ''">
        <label class="form-label"><strong class="text-danger">*</strong> Quantity</label>
        <input type="text" class="form-control" placeholder="Type the quantity here" v-model="quantity">
    </div>
    <button class="btn btn-primary" type="submit" :disabled="data_store.content_loading">Add</button>
</form>
</template>
<script setup>
import { usePosStore } from '../../stores/pos';
import { onMounted } from 'vue';
import SearchableList from '../_searchable_list.vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '../../stores/data';
const data_store = useDataStore();
const store = usePosStore();
const {
    current_method,
    current_category,
    current_generic_name,
    current_brand_name,
    quantity,
    current_id,
    drugs,
    generic_names,
} = storeToRefs(store)

const {
    select_method,
    select_category,
    select_generic_name,
    select_brand_name,
    initiate,
    addToCart,
} = store;

onMounted(()=>{
    initiate()
})
</script>
