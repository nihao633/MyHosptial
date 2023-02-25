<template>
<div class='form-control table-responsive d-none d-md-block'>
    <table class="table table-bordered ">
        <thead class="custom-bg text-white">
            <tr>
                <th scope="col" v-for="(value,key) in array[0]">{{ make_uppercase(key) }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td v-for="(value,key) in array[0]"><input type="text" @keyup="$emit('begin_search',key,$event.target.value)" @keydown="$emit('pause_search')" class="form-control" :style="key.length == 2 ? 'width: 6rem;': 'width: 10rem;'" :placeholder="make_uppercase(key)" :disabled="is_disabled(key,disabled_list,'id')"/></td>
            </tr>
            <tr class="my-row" v-for="drug in array" :class="{ active: selected_row == drug }" @click="$emit('select_row',drug)" @dblclick="$emit('edit_mode_on')" v-if="searching!== true && array.length !== 0 && !not_found">
                <td v-for="(value,key) in array[0]">{{ edit_row ? '' : drug[key] }} <input :type="key == 'Purchased Date' ? 'Date' : 'text'" v-if="edit_row && selected_row == drug" class="form-control" :style="is_disabled(key,disabled_list) ? 'width: 6rem; background-color: #1d92cf !important; color: white; border: 0;': 'width: 10rem;'" :value="drug[key]"  @keyup="$emit('begin_edit',key,$event.target.value,$event.code)" @keydown="$emit('pause_edit')" :disabled="is_disabled(key,disabled_list)"/></td>
            </tr>
            <tr class="my-row" v-if="not_found">
                <td colspan="3" class="text-danger">Nothing Found</td>
            </tr>
            <tr class="my-row" v-if="searching">
                <td colspan="3">Searching ... </td>
            </tr>

        </tbody>
    </table>
</div>
<div class="d-block d-md-none text-center text-danger">
    Please use a device with a bigger screen to view the data table.
</div>
</template>

<script setup>
defineProps({
    path: {
        type: Array,
    },
    disabled_list: {
        type: Array,
        default: []
    },
    edit_row: {
        default: false,
    },
    searching: {
        default: null,
    },
    not_found: {
        default: false,
    },
    array: {
        required: true,
        type: Array,
    },
    selected_row: {
        required: true,
    }
})
defineEmits(['select_row', 'begin_search', 'pause_search','edit_mode_on','begin_edit','pause_edit'])

const is_disabled = (val,arr,exception = null) => {
    if(exception == val) return false;
    return (arr.indexOf(val) !== -1);
}

const make_uppercase = (str) => {
    if(str.length == 2) return str.charAt(0).toUpperCase() + str.slice(1);

    return str.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
}
</script>

<style scoped>
.my-row:hover {
    background-color: grey;
    color: white;
}

.active {
    background-color: #1d92cf !important;
    color: white;
}
</style>
