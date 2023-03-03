<template>
<div class="mb-5" v-if="!is_empty && patients.length !== 0">
    <div class="mb-3">
        <label for="patient_name" class="form-label">Choose your patient:</label>
        <li class="dropdown list-unstyled">
            <button type="button" class="dropdown-toggle form-control text-start" :class="selected_patient == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                {{ 
                    selected_patient == ''  ? 'Choose your patient' : selected_patient.name + ' (Patient ID: ' + selected_patient.id + ') '
                }}
            </button>
            <ul id="select_patient" class="dropdown-menu form-control" style="overflow: auto;" :style="patients.length > 3 ? 'height:200px;' : ''">
                <input type="text" class="form-control" v-model="search_text" @keydown="pause_search()" @keyup="begin_search()" placeholder="Type here to search">
                <li role="button" class="p-3 custom-select-button" v-if="!not_found && searching">Searching...</li>
                <li role="button" class="p-3 custom-select-button" v-if="not_found && !searching">Not Found</li>
                <li role="button" class="p-3 custom-select-button" v-for="patient in patients" @click="load_consultants(patient)" :class="{ 'd-none': patients.length == 0}" v-if="!not_found && !searching">{{ patient.name + ' (Patient ID: ' + patient.id + ') '}}</li>
            </ul>
        </li>
    </div>
    <div class="mb-3 text-danger" v-if="new_medicords.length == 0 && selected_patient !== ''">
        No investigation records for this patient found.
    </div>
    <div class="mb-3" v-if="new_medicords.length !== 0">
        <label for="consultant_name" class="form-label">Choose your consultant:</label>
        <li class="dropdown list-unstyled">
            <button type="button" class="dropdown-toggle form-control text-start" :class="selected_consultant == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                {{ 
                    new_consultants.length == 0 ? "Please choose your patient's name first." : (selected_consultant == '' ? 'Choose your consultant' : selected_consultant.name)
                }}
            </button>
            <ul id="select_consultant" class="dropdown-menu form-control" style="overflow: auto;" :style="new_consultants.length > 3 ? 'height:200px;' : ''">
                <li role="button" class="p-3 custom-select-button" v-for="consultant in new_consultants" @click="load_dov(consultant)">{{ consultant.name}}</li>
            </ul>
        </li>
    </div>
    <div class="mb-3" v-if="new_medicords.length !== 0">
        <label for="date_of_visit" class="form-label">Choose date of visit:</label>
        <li class="dropdown list-unstyled">
            <button type="button" class="dropdown-toggle form-control text-start" :class="selected_medicord == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                {{ 
                    dov.length == 0 ? "Please choose your consultant's name first." : (selected_medicord == '' ? 'Choose your date of visit' : selected_medicord.date_of_visit)
                }}
            </button>
            <ul id="select_dov" class="dropdown-menu form-control" style="overflow: auto;" :style="dov.length > 3 ? 'height:200px;' : ''">
                <li role="button" class="p-3 custom-select-button" v-for="medicord in dov" @click="load_medicord(medicord)">{{ medicord.date_of_visit}}</li>
            </ul>
        </li>
    </div>
    <form @submit.prevent="update()" v-if="selected_medicord && new_medicords.length !== 0">
        <div class="mb-3">
            <label class="form-label">Select Version:</label>
            <li class="dropdown list-unstyled">
                <button type="button" class="dropdown-toggle form-control text-start" :class="selected_medicord == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                    {{ 
                        selected_medicord == ''  ? 'Choose versions' : selected_medicord.version
                    }}
                </button>
                <ul id="select_version" class="dropdown-menu form-control" style="overflow: auto;" :style="medicord_versions.length > 3 ? 'height:200px;' : ''">
                    <li role="button" class="p-3 custom-select-button" v-for="version in medicord_versions" @click="load_version(version)" :class="{ 'd-none': medicord_versions.length == 0}">{{ version.version}}</li>
                </ul>
            </li>
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
        <button class="btn btn-primary" type="submit">Save</button>
    </form>
</div>
<div v-if="patients.length == 0 && !is_empty" class="p-2">
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
<div v-if="is_empty">
    No medical record found. Please contact the reception for more information.
</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import init from '../../helpers/init';
import { useOpdStore } from '../../stores/medicord';

let available_dates = [];
const timer_id = ref('');
const search_text = ref('');
const invalid_date_of_visit_msg = ref(null)
const store = useOpdStore()
const {     
    history,
    physical_examination,
    investigation,
    treatment,
    diagnosis,
    next_appointment,
    selected_medicord
 } = storeToRefs(store)
 const { update_medicord } = store
const selected_patient = ref('')
const is_empty = ref(false)
const not_found = ref(false)
const searching = ref(false)
const patients = ref([])
const old_medicords = ref([])
const new_medicords = ref([])
const old_consultants = ref([])
const new_consultants = ref([])
const selected_consultant = ref('')
const medicord_versions = ref([])
const dov = ref([])

const update = async () => {
    if(await update_medicord()) initiate()
}

const initiate = async () => {
    selected_patient.value = ''
    old_consultants.value = []
    new_consultants.value = []
    old_medicords.value = []
    new_medicords.value = []
    is_empty.value = false
    const res = await init.sendDataToServer('medicords','post',{
        is_new:'false',
        visit_type: 'imaging',
        search_text: search_text.value,
    })
    const res_consultants = await init.sendDataToServer('consultants')

    old_consultants.value = res_consultants.data?.consultants
    old_medicords.value = res.data?.medicords
    patients.value = res.data?.patients

    if(patients.value.length == 0) return is_empty.value = true
    return is_empty.value = false
}

const begin_search = async () => {
    clearTimeout(timer_id.value)
    searching.value = true
    timer_id.value = setTimeout(async ()=>{ 
    const res = await init.sendDataToServer('medicords','post',{
        is_new:'false',
        visit_type: 'imaging',
        search_text: search_text.value,
    })

    searching.value = false
    if(res.data.patients.length == 0) return not_found.value = true
    not_found.value = false
    return patients.value = res.data.patients
 },1000)
}

const pause_search = () => {
    clearTimeout(timer_id.value)
}

const load_consultants = async (val) => {
    selected_patient.value = val
    selected_consultant.value = ''
    selected_medicord.value = ''
    new_consultants.value = []
    new_medicords.value = []
    medicord_versions.value = []
    $('#select_patient').dropdown('toggle')
    old_medicords.value.forEach(medicord => {
        if(medicord.patient.name == selected_patient.value.name) medicord_versions.value.push(medicord)
        if(medicord.patient.name == selected_patient.value.name && medicord.version == 'ver_1') new_medicords.value.push(medicord)
    })
    new_medicords.value.forEach(medicord => {
        old_consultants.value.forEach(consultant => {
            if(medicord.consultant_name == consultant.name) new_consultants.value.push(consultant)
        })
    })
}

const load_dov = (val) => {
    selected_consultant.value = val
    selected_medicord.value = ''
    $('#select_consultant').dropdown('toggle')
    dov.value = new_medicords.value.filter((value,index,array)=>{
        return (value.consultant_name == selected_consultant.value.name && new Date(value.date_of_visit).getTime() <  new Date().getTime())
    })
}

const load_medicord = (val) => {
    selected_medicord.value = val
    history.value = selected_medicord.value.history
    physical_examination.value = selected_medicord.value.physical_examination
    investigation.value = selected_medicord.value.investigations
    treatment.value = selected_medicord.value.treatments
    diagnosis.value = selected_medicord.value.diagnosis
    next_appointment.value = selected_medicord.value.next_appointment
    $('#select_dov').dropdown('toggle')
    get_dates()
}

const load_version = (val) => {
    selected_medicord.value = val
    history.value = selected_medicord.value.history
    physical_examination.value = selected_medicord.value.physical_examination
    investigation.value = selected_medicord.value.investigations
    treatment.value = selected_medicord.value.treatments
    diagnosis.value = selected_medicord.value.diagnosis
    next_appointment.value = selected_medicord.value.next_appointment
    $('#select_version').dropdown('toggle')
    get_dates()
}

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
    new_consultants.value.forEach(consultant => {
        if(consultant.name === selected_medicord.value.consultant_name) consultant_id = consultant.id
    });
    const res = await init.sendDataToServer(`consultants/available?consultant_id=${consultant_id}`);
    res.data?.available_dates.forEach(element => {
        available_dates.push(element.date_available)
    });
    selectAvailableDays()
}

const validate = () => {
    if (available_dates.indexOf(next_appointment.value) == -1 && next_appointment.value !== '') {
        invalid_date_of_visit_msg.value = 'Please select the available dates only.'
        next_appointment.value = ''
        return false
    } 
    return true
}

onMounted(async ()=>{
    await initiate()
})
</script>
