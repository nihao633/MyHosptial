<template>
    <form @submit.prevent="register()" autocomplete="off" class="mb-5 pb-5">
    <input autocomplete="false" name="hidden" type="text" style="display:none;">
    <div class="mb-3">
        <label class="form-label" for="rank"><strong class="text-danger">*</strong>Consultant's Name:</label>
        <li class="dropdown list-unstyled">
            <button class="dropdown-toggle form-control text-start" :class="consultant == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                {{ consultant == '' ? "Choose your consultant" : consultant.name }}
            </button>
            <ul id="select_consultant" class="dropdown-menu form-control" style="overflow: auto;" :style="consultants?.length > 3 ? 'height:200px;' : ''">
                <li role="button" class="p-3 custom-select-button" v-for="consultant in consultants" @click="get_dates(consultant)">{{ consultant.name }}</li>
            </ul>
        </li>
    </div>
    <div class="mb-3" v-if="invalid_consultant_name_msg">
        <span class="text-white badge bg-danger">{{ invalid_consultant_name_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="date_of_visit" class="form-label"><strong class="text-danger">*</strong>Date of Visit:</label>
        <input type="text" v-model="date_of_visit" placeholder="Select Your Date of Visit" id="visit_date_picker" class="form-control" name="date_of_visit" @click="validate()" @change="validate()" @mousedown="invalid_date_of_visit_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_date_of_visit_msg">
        <span class="text-white badge bg-danger">{{ invalid_date_of_visit_msg }}</span>
    </div>
    <div class="mb-3">
        <label class="form-label" for="visit_type"><strong class="text-danger">*</strong>Visit Type:</label>
        <li class="dropdown list-unstyled">
            <button type="button" class="dropdown-toggle form-control text-start" :class="visit_type == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                {{ visit_type == '' ? "Choose your visit type" : visit_type.toUpperCase() }}
            </button>
            <ul id="select_visit_type" class="dropdown-menu form-control">
                <li role="button" class="p-3 custom-select-button" v-for="val in ['opd','ipd','lab','imaging']" @click="select_visit_type(val)">{{ val.toUpperCase() }}</li>
            </ul>
        </li>
    </div>
    <div class="mb-3" v-if="invalid_visit_type_msg">
        <span class="text-white badge bg-danger">{{ invalid_visit_type_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="name" class="form-label"><strong class="text-danger">*</strong>Patient's Name:</label>
        <input type="text" class="form-control" name="name" placeholder="e.g. John Smith" v-model="name" @mousedown="invalid_name_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_name_msg">
        <span class="text-white badge bg-danger">{{ invalid_name_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="age" class="form-label"><strong class="text-danger">*</strong>Age (years):</label>
        <input type="text" class="form-control" name="age" placeholder="e.g. 18" v-model="age" @mousedown="invalid_age_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_age_msg">
        <span class="text-white badge bg-danger">{{ invalid_age_msg }}</span>
    </div>
    <div class="mb-3">
        <label class="form-label" for="rank"><strong class="text-danger">*</strong>Sex:</label>
        <li class="dropdown list-unstyled">
            <button type="button" class="dropdown-toggle form-control text-start" :class="sex == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                {{ sex == '' ? "Choose your patient's sex" : sex.charAt(0).toUpperCase() + sex.slice(1) }}
            </button>
            <ul id="select_sex" class="dropdown-menu form-control">
                <li role="button" class="p-3 custom-select-button" v-for="val in ['male','female']" @click="select_sex(val)">{{ val.charAt(0).toUpperCase() + val.slice(1) }}</li>
            </ul>
        </li>
    </div>
    <div class="mb-3" v-if="invalid_sex_msg">
        <span class="text-white badge bg-danger">{{ invalid_sex_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="father_name" class="form-label"><strong class="text-danger">*</strong>Father's Name:</label>
        <input type="text" class="form-control" name="father_name" placeholder="e.g. John Smith" v-model="father_name" @mousedown="invalid_father_name_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_father_name_msg">
        <span class="text-white badge bg-danger">{{ invalid_father_name_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="address" class="form-label"><strong class="text-danger">*</strong>Address:</label>
        <input type="text" class="form-control" name="address" placeholder="e.g. 123, ABC St., 123 Qtr., ABC Tsp., ABC City, ABC Country" v-model="address" @mousedown="invalid_address_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_address_msg">
        <span class="text-white badge bg-danger">{{ invalid_address_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="phone" class="form-label"><strong class="text-danger">*</strong>Phone Number:</label>
        <input type="text" class="form-control" name="phone" placeholder="e.g. 09*****" v-model="phone_number" @mousedown="invalid_phone_number_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_phone_number_msg">
        <span class="text-white badge bg-danger">{{invalid_phone_number_msg}}</span>
    </div>
    <button class="btn btn-primary float-end" type="submit">Register</button>
</form>
</template>

<script setup>
import {
    storeToRefs
} from 'pinia';
import {
    onMounted,
    ref
} from 'vue';
import init from '../../helpers/init';
import {
    useReceptionStore
} from '../../stores/reception';

const store = useReceptionStore();
const consultants = ref(null);
let available_dates = [];
const {
    date_of_visit,
    visit_type,
    name,
    age,
    sex,
    father_name,
    address,
    phone_number,
    consultant,
    invalid_date_of_visit_msg,
    invalid_visit_type_msg,
    invalid_name_msg,
    invalid_age_msg,
    invalid_sex_msg,
    invalid_father_name_msg,
    invalid_address_msg,
    invalid_phone_number_msg,
    invalid_consultant_name_msg,
} = storeToRefs(store)
const {
    register_patient
} = store;

const register = () => {
    (validate()) ? register_patient() : invalid_date_of_visit_msg.value = 'Please select the date of visit.'
}

const validate = () => {
    if (available_dates.indexOf(date_of_visit.value) == -1 && date_of_visit.value !== '') {
        invalid_date_of_visit_msg.value = 'Please select the available dates only.'
        date_of_visit.value = ''
        return false
    } 
    return true
}

const select_visit_type = val => {
    visit_type.value = val
    $('#select_visit_type').dropdown('toggle')
}

function selectAvailableDays() {
    const date_formatter = (date) => jQuery.datepicker.formatDate('yy-mm-dd', date)

    $('#visit_date_picker').datepicker({
        dateFormat: 'yy-mm-dd',
        beforeShowDay: function (date) {
            var date = date_formatter(date);
            var current_date = date_formatter(new Date());
            if (date > current_date) return [false]
            return [available_dates.indexOf(date) >= 0, "notav", 'Available'];
        },
        onSelect: function() { 
        var dateObject = $(this).datepicker('getDate');
        date_of_visit.value = date_formatter(dateObject); 
    }
    });
}

const get_dates = async (val) => {
    consultant.value = val
    available_dates = []
    invalid_consultant_name_msg.value = ''
    $('#select_consultant').dropdown('toggle')
    const res = await init.sendDataToServer(`consultants/available?consultant_id=${val.id}`);
    res.data?.available_dates.forEach(element => {
        available_dates.push(element.date_available)
    });
    selectAvailableDays()
}

const select_sex = val => {
    sex.value = val
    $('#select_sex').dropdown('toggle')
}

onMounted(async () => {
    const res = await init.sendDataToServer('consultants')

    consultants.value = res.data?.consultants
})
</script>
