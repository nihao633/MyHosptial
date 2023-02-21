<template>
<form class="my-3">
    <SearchableList :class="'mb-3'" :array="year_lists" :selected_val="current_year" @select="select_year"/>
    <SearchableList :class="'mb-3'" :array="['monthly_report','quarterly_report','yearly_report']" :selected_val="current_report" @select="select_report"  v-if="current_year !== ''"/>
    <SearchableList :class="'mb-3'" :array="month_lists" :selected_val="current_duration" @select="select_duration" v-if="current_report == 'monthly_report'"/>
    <SearchableList :class="'mb-3'" :array="quarter_lists" :selected_val="current_duration" @select="select_duration" v-if="current_report == 'quarterly_report'"/>
    <button class="btn btn-primary" type="submit">Generate</button>
</form>
</template>
<script setup>
import { useDataStore } from '../../stores/data';
import { ref,onMounted } from 'vue';
import SearchableList from '../_Global_/_searchable_list.vue';

const store = useDataStore();
const current_year = ref('');
const current_report = ref('');
const current_duration = ref('');
const year_lists = ref([]);
const month_lists = ref([
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
]);
const quarter_lists = ref([
    'jan_-_mar',
    'apr_-_jun',
    'jul_-_sep',
    'oct_-_dec'
])

onMounted(()=>{
    let this_year = new Date().getFullYear();
    for (let index = 0; index < 50; index++) {
        year_lists.value.push(`${this_year - index}`)  
    }
})

const select_year = val => {
    current_year.value = val
    current_report.value = ''
    current_duration.value = ''
}
const select_report = val => {
    current_report.value = val
    current_duration.value = ''
}

const select_duration = val => {
    current_duration.value = val
    if (new Date('1/' + current_duration.value + '/' + current_year.value) > new Date()) {
        current_duration.value = ''
        return store.toggleAlert('You can only select up to the current month of this year.')   
    }
    if (new Date('1/' + current_duration.value.split('_')[2] + '/' + current_year.value) > new Date()) {
        current_duration.value = ''
        return store.toggleAlert('You can only select up to the current month of this year.')   
    }
}
</script>
