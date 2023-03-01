<template>
<TabLayout
    :title="'Laboratory'"
    :array="tabs"
    :current_tab="current_tab"
    @select="initiate"
/>
</template>
<script setup>
import TabLayout from '@/components/_Global_/TabLayout.vue';
import { useMedicordComposable } from '@/composables/medicord';

const {
    current_tab,
    initiate,
    tabs
} = useMedicordComposable();
</script>
