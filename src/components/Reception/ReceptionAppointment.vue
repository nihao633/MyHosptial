<template>
<form @submit.prevent="register" autocomplete="off">
    <div class="mb-3">
        <label class="form-label" for="rank"><strong class="text-danger">*</strong>Consultant's Name:</label>
        <li class="dropdown list-unstyled">
            <button type="button" class="dropdown-toggle form-control text-start" :class="consultant == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
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
        <label for="date_of_visit" class="form-label"><strong class="text-danger">*</strong>Intended Date of Visit:</label>
        <input type="text" v-model="date_of_visit" placeholder="Select Your Date of Visit" id="visit_date_picker" class="form-control" name="date_of_visit" @click="validate()" @change="validate()" @mousedown="invalid_date_of_visit_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_date_of_visit_msg">
        <span class="text-white badge bg-danger">{{ invalid_date_of_visit_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="name" class="form-label"><strong class="text-danger">*</strong>Patient's Name:</label>
        <input type="text" class="form-control" name="name" placeholder="John Smith" v-model="name" @mousedown="invalid_name_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_name_msg">
        <span class="text-white badge bg-danger">{{ invalid_name_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="age" class="form-label"><strong class="text-danger">*</strong>Age (years):</label>
        <input type="text" class="form-control" name="age" placeholder="18" v-model="age" @mousedown="invalid_age_msg = null">
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
        <label for="address" class="form-label"><strong class="text-danger">*</strong>Address:</label>
        <input type="text" class="form-control" name="address" placeholder="123, ABC St., 123 Qtr., ABC Tsp., ABC City, ABC Country" v-model="address" @mousedown="invalid_address_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_address_msg">
        <span class="text-white badge bg-danger">{{ invalid_address_msg }}</span>
    </div>
    <div class="mb-3">
        <label for="phone" class="form-label"><strong class="text-danger">*</strong>Phone Number:</label>
        <input type="text" class="form-control" name="phone" placeholder="09*****" v-model="phone_number" @mousedown="invalid_phone_number_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_phone_number_msg">
        <span class="text-white badge bg-danger">{{invalid_phone_number_msg}}</span>
    </div>
    <button class="btn btn-primary float-end mb-5" type="submit">Save</button>
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
    name,
    age,
    sex,
    address,
    phone_number,
    consultant,
    invalid_date_of_visit_msg,
    invalid_name_msg,
    invalid_age_msg,
    invalid_sex_msg,
    invalid_address_msg,
    invalid_phone_number_msg,
    invalid_consultant_name_msg,
} = storeToRefs(store)
const {
    register_appointment
} = store;

const register = () => {
    (validate()) ? register_appointment(): invalid_date_of_visit_msg = 'Please select the intended date of visit.'
}

const select_sex = (val) => {
    sex.value = val
    $('#select_sex').dropdown('toggle')
}

const validate = () => {
    if (available_dates.indexOf(date_of_visit.value) == -1 && date_of_visit.value !== '') {
        invalid_date_of_visit_msg.value = 'Please select the available dates only.'
        date_of_visit.value = ''
        return false
    }
    return true
}

function selectAvailableDays() {
    const date_formatter = (date) => jQuery.datepicker.formatDate('yy-mm-dd', date)

    $('#visit_date_picker').datepicker({
        dateFormat: 'yy-mm-dd',
        beforeShowDay: function (date) {
            var date = date_formatter(date);
            var current_date = date_formatter(new Date());
            if (date < current_date) return [false]
            return [available_dates.indexOf(date) >= 0, "notav", 'Available'];
        },
        onSelect: function () {
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
onMounted(async () => {
    const res = await init.sendDataToServer('consultants')

    consultants.value = res.data?.consultants
})
</script>
