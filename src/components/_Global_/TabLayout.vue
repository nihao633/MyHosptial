<template>
<div class="container mx-auto" >
    <h1 class="my-4" v-if="!is_pill">{{ title }}</h1>
    <ul class="nav d-none d-md-flex" :class="is_pill ? 'nav-pills flex-row flex-md-column' : 'nav-tabs'">
        <li class="nav-item" v-for="(item,key) in array">
            <a class="nav-link" 
                @click="$emit('select',key);" 
                :class="{ 'active shadow': current_tab == key }" 
                role="button"
            >{{ item }}</a>
        </li>
    </ul>
    <div class="d-md-none">
        <SearchableList :array="array" :selected_val="array[current_tab]" @select="(val)=>{$emit('select',array.indexOf(val))}"/>
        <hr>
    </div>
</div>
</template>
<script setup>
import SearchableList from '../../components/_Global_/_searchable_list.vue';
const props = defineProps({
    title: {
        type: String,
    },
    current_tab: {
        required: true,
        type: Number,
    },
    array: {
        required: true,
        type: Array,
    },
    is_pill: {
        default: false,
        type: Boolean,
    }
})
defineEmits(['select'])
</script>
<style scoped>
.nav-link {
    color: #1d92cf !important;
    border-radius: 0 !important;
}

.nav-link:hover {
    background: grey !important;
    color: white !important;
}

.active {
    color: white !important;
    background: #1d92cf !important;
    border: 0 !important;
}
</style>