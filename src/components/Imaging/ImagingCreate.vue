<template>
    <form @submit.prevent="save()" autocomplete="off" class="mb-5 pb-5">
    <div v-if="is_empty">
        No imaging record found. Please contact the reception for more information.
    </div>
    <div class="mb-3" v-if="medicords.length !== 0 && !is_empty">
        <label for="consultant" class="form-label"><strong class="text-danger">*</strong>Patient's Name:</label>
        <li class="dropdown list-unstyled">
            <button type="button" class="dropdown-toggle form-control text-start" :class="selected_medicord == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                {{ 
                    selected_medicord == ''  ? 'Choose your patient' : selected_medicord?.patient?.name + ' (Patient ID: ' + selected_medicord?.patient?.id + ') '
                }}
            </button>
            <ul id="select_medicord" class="dropdown-menu form-control" style="overflow: auto;" :style="medicords.length > 3 ? 'height:200px;' : ''">
                <li role="button" class="p-3 custom-select-button" v-for="medicord in medicords" @click="load_medicord(medicord)">{{ medicord.patient.name + ' (ID: ' + medicord.patient.id + ' Consultant: ' + medicord.consultant_name + ') '}}</li>
            </ul>
        </li>
    </div>
    <div v-if="medicords.length == 0 && !is_empty" class="p-2">
        <h6>
            Loading...
        </h6>
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="selected_medicord">
        <div class="mb-3">
        <label for="date_of_visit" class="form-label">Date of Visit:</label>
        <input type="text" v-model="date_of_visit" placeholder="You can change the date of visit at the reception only." class="form-control" name="date_of_visit" @change="load_medicord()" disabled>
    </div>
    <div class="mb-3">
        <span class="text-white badge bg-danger"><em>You can change the date of visit at the reception only.</em></span>
    </div>
    <div class="mb-3">
        <label for="consultant_name" class="form-label">consultant's Name:</label>
        <input type="text" v-model="consultant" placeholder="You can change the consultant's name at the reception only." class="form-control" name="consultant_name" @change="load_medicord()" disabled>
    </div>
    <div class="mb-3">
        <span class="text-white badge bg-danger"><em>You can change the consultant's name at the reception only.</em></span>
    </div>
    <div class="mb-3">
        <label for="history" class="form-label">Findings:</label>
        <textarea name="history" class="form-control" cols="30" rows="10" v-model="history"></textarea>
    </div>
    <div class="mb-3">
        <label for="physical_examination" class="form-label">Impression:</label>
        <textarea name="physical_examination" class="form-control" cols="30" rows="10" v-model="physical_examination"></textarea>
    </div>
    <div class="mb-3">
        <label for="investigation" class="form-label">Investigation Type:</label>
        <textarea name="investigation" class="form-control" cols="30" rows="10" v-model="investigation"></textarea>
    </div>
    <div class="mb-3">
        <label for="treatment" class="form-label">Provisional Diagnosis:</label>
        <textarea name="treatment" class="form-control" cols="30" rows="10" v-model="treatment"></textarea>
    </div>
    <div class="mb-3">
        <label for="diagnosis" class="form-label">Next Plan Advice:</label>
        <input type="text" name="diagnosis" class="form-control" v-model="diagnosis">
    </div>
    <div class="mb-3">
        <label for="next_appointment" class="form-label">Next Appointment:</label>
        <input type="text" name="next_appointment" id="next_visit_date_picker" class="form-control" v-model="next_appointment"  @click="validate()" @change="validate()" @mousedown="invalid_date_of_visit_msg = null">
    </div>
    <div class="mb-3" v-if="invalid_date_of_visit_msg">
        <span class="text-white badge bg-danger">{{ invalid_date_of_visit_msg }}</span>
    </div>
    <button class="btn btn-primary float-end" type="submit">Save</button>
    </div>
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
        useOpdStore
} from '../../stores/medicord';

const invalid_date_of_visit_msg = ref(null)
const store = useOpdStore();
const medicords = ref([]);
let available_dates = [];
const consultants = ref(null)
const is_empty = ref(false);
const {
    date_of_visit,
    consultant,
    history,
    physical_examination,
    investigation,
    treatment,
    diagnosis,
    next_appointment,
    selected_medicord
} = storeToRefs(store)
const {
    create_medicord
} = store;

const save = async () => {
    create_medicord()
    initiate()
}

const initiate = async () => {
    consultants.value = []
    medicords.value = []
    const res = await init.sendDataToServer('medicords','post',{
        is_new: 'true',
        visit_type: 'imaging',
    })
    const res_consultants = await init.sendDataToServer('consultants')

    consultants.value = res_consultants.data?.consultants
    medicords.value = res.data.medicords
    
    if (medicords.value.length !== 0) return is_empty.value =false
    return is_empty.value = true
}

const load_medicord = (val) => {
    selected_medicord.value = val
    $('#select_medicord').dropdown('toggle')
    date_of_visit.value = selected_medicord.value.date_of_visit
    consultant.value = selected_medicord.value.consultant_name
    history.value = selected_medicord.value.history
    physical_examination.value = selected_medicord.value.physical_examination
    investigation.value = selected_medicord.value.investigation
    diagnosis.value = selected_medicord.value.diagnosis
    treatment.value = selected_medicord.value.treatment
    next_appointment.value =selected_medicord.value.next_appointment
    get_dates()
}

const validate = () => {
    if (available_dates.indexOf(next_appointment.value) == -1 && next_appointment.value !== '') {
        invalid_date_of_visit_msg.value = 'Please select the available dates only.'
        next_appointment.value = ''
        return false
    } 
    return true
}

onMounted(async () => {
    await initiate()
})

function selectAvailableDays() {
    const date_formatter = (date) => jQuery.datepicker.formatDate('yy-mm-dd', date)

    $('#next_visit_date_picker').datepicker({
        dateFormat: 'yy-mm-dd',
        beforeShowDay: function (date) {
            var date = date_formatter(date);
            var current_date = date_formatter(new Date());
            if (date < current_date) return [false]
            return [available_dates.indexOf(date) >= 0, "notav", 'Available'];
        },
        onSelect: function () {
            var dateObject = $(this).datepicker('getDate');
            next_appointment.value = date_formatter(dateObject);
        }
    });
}

const get_dates = async () => {
    available_dates = []
    let consultant_id = null
    consultants.value.forEach(consultant => {
        if(consultant.name === selected_medicord.value.consultant_name) consultant_id = consultant.id
    });
    const res = await init.sendDataToServer(`consultants/available?consultant_id=${consultant_id}`);
    res.data?.available_dates.forEach(element => {
        available_dates.push(element.date_available)
    });
    selectAvailableDays()
}
</script>
