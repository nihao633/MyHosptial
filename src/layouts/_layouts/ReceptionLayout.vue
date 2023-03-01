<template>
<TabLayout
    :title="'Reception'"
    :array="tabs"
    @select="(val)=>{current_tab=val;router.push('/reception/' + tabs[val]);reset();}"
    :current_tab="current_tab"
/>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useReceptionStore } from '../../stores/reception';
import TabLayout from '../../components/_Global_/TabLayout.vue';
import router from '../../router';
import { onMounted } from 'vue';

const tabs = [
    'register',
    'appointment',
    'manage',
    'find'
]
const store = useReceptionStore();
const { 
    current_tab 
} = storeToRefs(store);
const { 
    reset
} = store;

onMounted(()=>{
    const full_path = router.currentRoute.value.fullPath.split('/')
    current_tab.value = tabs.indexOf(full_path[full_path.length - 1].toLowerCase())
})
</script>
