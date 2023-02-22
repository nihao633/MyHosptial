<template>
<TabLayout
    :title="'Laboratory'"
    :array="[
        'Create',
        'Manage'
    ]"
    :current_tab="current_tab"
    @select="(val)=>{current_tab=val;reset();}"
/>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import TabLayout from '../../components/_Global_/TabLayout.vue';
import {
    useOpdStore
} from '../../stores/medicord';

const store = useOpdStore();
const { current_tab } = storeToRefs(store);
const { reset } = store;
</script>
