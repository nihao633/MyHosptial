<template>
<li class="dropdown list-unstyled">
    <button type="button" class="dropdown-toggle form-control text-start text-wrap" :class="class" data-bs-toggle="dropdown">
        {{ selected_val == '' ? placeholder : set_name(selected_val,path)  }}
    </button>
    <ul id="select_sex" class="dropdown-menu form-control" style="overflow: auto;" :style="array.length > 3 ? 'height:200px;' : ''">
        <li class="p-3 custom-select-button" v-if="array.length == ''">Loading...</li>
        <li role="button" class="p-3 custom-select-button" v-for="val in array" @click="$emit('select',val)">{{ set_name(val,path) }}</li>
    </ul>
</li>
</template>
<script setup>
const make_uppercase = (str) => {
    if(str.length == 2) return str.charAt(0).toUpperCase() + str.slice(1);

    return str.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
}
const set_name = (val,path = null) => {
    if(typeof(val) == 'string') return make_uppercase(val)
    if(path?.length == 2) return val[path[0]] + ' (' + val[path[1]] + ')'
    if(path?.length == 3) return val[path[0]] + ' (' + val[path[1]] + ')' + ' (' + val[path[2]] + ')'
    if(path?.length == 4) return val[path[0]] + ' (' + val[path[1]] + ')' + ' (' + val[path[2]] + ')' + ' (' + val[path[3]] + ')'
    
    if(path) return val[path[0]]
}

defineProps({
    path: {
        type: Array,
    },
    class: {
        type: String,
        default: '',
    },
    array: {
        required: true,
        type: Array,
    },
    selected_val: {
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Please select one'
    }
})
defineEmits(['select'])
</script>
