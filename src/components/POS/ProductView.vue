<template>
<div class="row mx-0 px-3">
    <ItemBar :class="'col-5 col-lg-5 col-xl-7'" :item_name="item_name" :quantity="quantity" :price="unit_price" />
    <PriceBar :class="'col text-end'" :price="price" />
</div>
</template>

<script setup>
import ItemBar from './ItemBar.vue';
import PriceBar from './PriceBar.vue';

defineProps([
    'item_name',
    'quantity',
    'unit_price',
    'price'
])
</script>
