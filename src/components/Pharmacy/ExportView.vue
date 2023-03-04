<template>
<div class="my-3">
    <SearchableList :class="'mb-3'" :array="year_lists" :selected_val="current_year" @select="select_year"/>
    <SearchableList :class="'mb-3'" :array="['monthly_report','quarterly_report','yearly_report']" :selected_val="current_report" @select="select_report"  v-if="current_year !== ''"/>
    <SearchableList :class="'mb-3'" :array="month_lists" :selected_val="current_duration" @select="select_duration" v-if="current_report == 'monthly_report'"/>
    <SearchableList :class="'mb-3'" :array="quarter_lists" :selected_val="current_duration" @select="select_duration" v-if="current_report == 'quarterly_report'"/>
    <div class="d-flex justify-content-between">
        <button class="btn btn-primary" type="button" @click="generate_report()">Generate</button>
        <SearchableList 
            :array="['bar','pie','line','radar']"
            :selected_val="display_type"
            @select="val=>display_type=val"
        />
    </div>
</div>
</template>
<script setup>
import { useDataStore } from '@/stores/data';
import { useStatisticsStore } from '@/stores/statistics';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useDataStore();
const statistics_store = useStatisticsStore();
const {
    current_duration,
    current_report,
    current_year,
    year_lists,
    display_type
} = storeToRefs(statistics_store)
const {
    generate_report
} = statistics_store
const month_lists = [
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
];
const quarter_lists = [
    'jan_-_mar',
    'apr_-_jun',
    'jul_-_sep',
    'oct_-_dec'
]

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
