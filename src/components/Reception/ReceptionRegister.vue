<template>
    <form @submit.prevent="register()" autocomplete="off" class="mb-5 pb-5">
    <input autocomplete="false" name="hidden" type="text" style="display:none;">
    <ConsultantSelector 
        :class="'mb-3'"
        @select="get_dates"
    />
    <InputBox 
        :id="'visit_date_picker'"
        :class="'mb-3'"
        :placeholder="'Select Your Date of Visit'"
        :label="'Date of Visit:'"
        :required_label="true"
        v-model:input_value="date_of_visit"
        :error_message="invalid_date_of_visit_msg"
        @clear_error="()=>{invalid_date_of_visit_msg=null}"
    />
    <div class="mb-3">
        <label class="form-label" for="visit_type"><strong class="text-danger">*</strong>Visit Type:</label>
        <SearchableList 
            :class="'mb-3'"
            :array="['opd','ipd','lab','imaging']"
            @select="select_visit_type"
            :selected_val="visit_type"
            :error_message="invalid_visit_type_msg"
            @clear_error="()=>{invalid_visit_type_msg = null}"
        />
    </div>
    <InputBox 
        :label="'Patient\'s Name:'"
        :required_label="true"
        :placeholder="'e.g. John Smith'"
        v-model:input_value="name"
        :error_message="invalid_name_msg"
        @clear_error="()=>{invalid_name_msg=null}"
    />
    <InputBox 
        :label="'Age (years):'"
        :required_label="true"
        :placeholder="'e.g. 18'"
        v-model:input_value="age"
        :error_message="invalid_age_msg"
        @clear_error="()=>{invalid_age_msg=null}"
    />
    <div class="mb-3">
        <label class="form-label" for="rank"><strong class="text-danger">*</strong>Sex:</label>
        <SearchableList 
            :array="['male','female']"
            :selected_val="sex"
            :placeholder="'Choose your patient\'s sex'"
            @select="select_sex"
        />
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
import ConsultantSelector from './components/ConsultantSelector.vue';
import {
    storeToRefs
} from 'pinia';
import init from '../../helpers/init';
import {
    useReceptionStore
} from '../../stores/reception';

const store = useReceptionStore();
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

</script>
