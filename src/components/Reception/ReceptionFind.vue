<template>
  <form @submit.prevent="search_patients()">
    <div class="row g-2 mb-3">
    <div class="col-md">
        <div class="">
            <label class="form-label"><strong class="text-danger">*</strong>Search value:</label>
            <input type="text" class="form-control" v-model="search_value" placeholder="e.g. 1">
        </div>
    </div>
    <div class="col-md">
        <div class="mb-3">
            <label class="form-label" for="rank"><strong class="text-danger">*</strong>Category:</label>
            <li class="dropdown list-unstyled">
                <button type="button" class="dropdown-toggle form-control text-start" :class="search_mode == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                    {{ search_mode == '' ? "Choose category" : search_mode.charAt(0).toUpperCase() + search_mode.slice(1) }}
                </button>
                <ul id="select_search_mode" class="dropdown-menu form-control">
                    <li role="button" class="p-3 custom-select-button" v-for="id in ['id','name']" @click="select_search_mode(id)">{{ id.charAt(0).toUpperCase() + id.slice(1) }}</li>
                </ul>
            </li>
        </div>
    </div>
</div>
<button type="submit" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#find_dialog">Search</button>
  </form>
<div class="form-check">
    <input class="form-check-input bg-secondary border-secondary" type="radio" v-model="search_location" value="patient">
    <label class="form-check-label" for="flexRadioDefault1">
        Patient
    </label>
</div>
<div class="form-check">
    <input class="form-check-input bg-secondary border-secondary" type="radio" v-model="search_location" value="appointment">
    <label class="form-check-label" for="flexRadioDefault2">
        Appointment
    </label>
</div>
<div class="modal fade" id="find_dialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Search Results: <em> '<strong>{{search_value}}</strong>' in {{ search_mode }} of {{ search_location == 'patient' ? 'Patients' : 'Appointments' }}</em></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="list-group form-control p-2">
                    <a v-if="search_results.length !== 0 && !loading" v-for="patient in search_results" role="button" @click="edit(patient)" class="list-group-item list-group-item-action" :class="{ active: selected_patient == patient}">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ patient.name }}</h5><em class="me-auto"><small>&nbsp;({{ search_location == 'patient' ? ' Client ID: ' : 'Appointment ID: ' }}{{ patient.id }})</small></em>
                            <small>{{ patient.sex }}</small>
                        </div>
                        <p class="mb-1" v-if="search_location !== 'patient'"><strong>Intended Date of Visit: </strong>{{ patient.intended_date_of_visit }}</p>
                        <p class="mb-1"><strong>Age: </strong>{{ patient.age }}</p>
                        <div>
                            <strong> Phone Number: </strong>{{ patient.phone_number }}
                        </div>
                        <small><strong>Consultant's Name: </strong>{{ patient.consultant_name }}</small>
                        <div v-if="selected_patient !== null && selected_patient == patient" class="bottom-0 end-0 position-absolute bg-white shadow">
                            <button class="btn btn-mine text-secodnary" title="view more" data-bs-target="#patient_dialog" data-bs-toggle="modal"><i class="fa-solid fa-eye"></i></button>
                            <button class="btn btn-mine text-secodnary" title="print" @click="print_record()"><i class="fa-solid fa-print"></i></button>
                            <button class="btn btn-mine text-secodnary" title="edit" data-bs-target="#patient_dialog" data-bs-toggle="modal" @click="edit_mode = true"><i class="fa-solid fa-file-pen"></i></button>
                            <button class="btn btn-mine text-danger" title="delete" data-bs-target="#confirm_dialog" data-bs-toggle="modal"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </a>
                    <div v-if="loading" class="p-2">
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
                    <div v-if="search_results.length == 0 && search_location !== 'patient' && !loading">
                        No Appointment Records Found.
                    </div>
                    <div v-if="search_results.length == 0 && search_location == 'patient' && !loading">
                        No Patient Records Found.
                    </div>
                    <div class="text-danger" v-if="search_value == '' || search_mode == ''">
                        Error! Search value or category cannot be empty.
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
        <div class="card ms-auto py-4 d-none">
            <h4 class="text-center my-3">Print Preview:</h4>
            <div class="mx-auto w-75 my-4 form-control" id="print_register">
                <p>Name: {{ name }} <em>({{ search_location == 'patient' ? ' Client ID: ' : 'Appointment ID: '}} {{
                selected_patient?.id }})</em></p>
                <p>Age: {{ age }}/{{ sex }}</p>
                <p>Address: {{ address }}</p>
                <p>Phone No: {{ phone_number }}</p>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" data-bs-backdrop="static" id="patient_dialog" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ edit_mode ? 'Edit' : 'View' }} {{ search_location == 'patient' ? 'Patient' : 'Appointment' }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" @click="edit_mode = false"></button>
            </div>
            <div class="modal-body">
                <p v-if="search_location !== 'patient'"><strong>Intended Date of Visit: </strong>{{ selected_patient?.intended_date_of_visit }}</p>
                <strong class="text-danger d-block mb-3" v-if="edit_mode && search_location !== 'patient'">* <em>Please <a href="#" title="delete" data-bs-target="#confirm_dialog" data-bs-toggle="modal">delete</a> the current appointment to update the appointment date.</em></strong>
                <div class="mb-3" v-if="invalid_father_name_msg">
                    <span class="text-white badge bg-danger">{{ invalid_father_name_msg }}</span>
                </div>
                <p><strong><strong class="text-danger" v-if="edit_mode">*</strong>Name: </strong>{{ edit_mode ? '' : selected_patient?.name }}<input class="form-control" type="text" v-model="name" v-if="edit_mode" @mousedown="invalid_name_msg = null"></p>
                <div class="mb-3" v-if="invalid_name_msg">
                    <span class="text-white badge bg-danger">{{ invalid_name_msg }}</span>
                </div>
                <p><strong><strong class="text-danger" v-if="edit_mode">*</strong>Age: </strong>{{ edit_mode ? '' : selected_patient?.age }}<input class="form-control" type="text" v-model="age" v-if="edit_mode" @mousedown="invalid_age_msg = null"></p>
                <div class="mb-3" v-if="invalid_age_msg">
                    <span class="text-white badge bg-danger">{{ invalid_age_msg }}</span>
                </div>
                <p><strong><strong class="text-danger" v-if="edit_mode">*</strong>Sex: </strong>{{ edit_mode ? '' : selected_patient?.sex }}       
                    <li class="dropdown list-unstyled" v-if="edit_mode">
                        <button type="button" class="dropdown-toggle form-control text-start" :class="sex == '' ? 'text-secondary' : 'text-black'" data-bs-toggle="dropdown">
                            {{ sex == '' ? "Choose your patient's sex" : sex.charAt(0).toUpperCase() + sex.slice(1) }}
                        </button>
                        <ul id="select_sex" class="dropdown-menu form-control">
                            <li role="button" class="p-3 custom-select-button" v-for="val in ['male','female']" @click="select_sex(val)">{{ val.charAt(0).toUpperCase() + val.slice(1) }}</li>
                        </ul>
                    </li>
                </p>
                <div class="mb-3" v-if="invalid_sex_msg">
                    <span class="text-white badge bg-danger">{{ invalid_sex_msg }}</span>
                </div>
                <p v-if="search_location == 'patient'"><strong><strong class="text-danger" v-if="edit_mode">*</strong>Father's Name: </strong>{{ edit_mode ? '' : selected_patient?.father_name }}<input class="form-control" type="text" v-model="father_name" v-if="edit_mode" @mousedown="invalid_father_name_msg = null"></p>
                <div class="mb-3" v-if="invalid_father_name_msg">
                    <span class="text-white badge bg-danger">{{ invalid_father_name_msg }}</span>
                </div>
                <p><strong><strong class="text-danger" v-if="edit_mode">*</strong>Address: </strong>{{ edit_mode ? '' : selected_patient?.address }}<input class="form-control" type="text" v-model="address" v-if="edit_mode" @mousedown="invalid_address_msg = null"></p>
                <div class="mb-3" v-if="invalid_address_msg">
                    <span class="text-white badge bg-danger">{{ invalid_address_msg }}</span>
                </div>
                <p><strong><strong class="text-danger" v-if="edit_mode">*</strong>Phone Number: </strong>{{ edit_mode ? '' : selected_patient?.phone_number }}<input class="form-control" type="text" v-model="phone_number" v-if="edit_mode" @mousedown="invalid_phone_number_msg = null"></p>
                <div class="mb-3" v-if="invalid_phone_number_msg">
                    <span class="text-white badge bg-danger">{{ invalid_phone_number_msg }}</span>
                </div>
                <p><strong><strong class="text-danger" v-if="edit_mode">*</strong>Consultant's Name: </strong>{{ edit_mode ? '' : selected_patient?.consultant_name }}<input class="form-control" type="text" v-model="consultant" v-if="edit_mode" @mousedown="invalid_consultant_name_msg = null"></p>
                <div class="mb-3" v-if="invalid_consultant_name_msg">
                    <span class="text-white badge bg-danger">{{ invalid_consultant_name_msg }}</span>
                </div>edit_mode
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="edit_mode = false">Close</button>
                <button type="button" class="btn btn-primary" v-if="edit_mode" @click="update(selected_patient)">Save changes</button>
            </div>
        </div>
    </div>
</div>
<ConfirmDialog @confirm="destroy(selected_patient)">
    <template #title>
        Are you sure to delete {{ search_location == 'patient' ? ' this patient named ' : ' this appointment for ' }} {{ selected_patient?.name }}?
    </template>
</ConfirmDialog>
</template>

<script setup>
import ConfirmDialog from '../_Global_/ConfirmDialog.vue';
import {
    storeToRefs
} from 'pinia';
import { useDataStore } from '../../stores/data';
import {
    useReceptionStore
} from '../../stores/reception';
import {
    ref
} from 'vue';
import init from '../../helpers/init';

const store = useReceptionStore();
const data_store = useDataStore();
const {
    name,
    age,
    sex,
    father_name,
    address,
    phone_number,
    consultant,
    invalid_name_msg,
    invalid_age_msg,
    invalid_sex_msg,
    invalid_father_name_msg,
    invalid_address_msg,
    invalid_phone_number_msg,
    invalid_consultant_name_msg,
} = storeToRefs(store);
const {
    update_patient,
    update_appointment,
    print_record,
    delete_patient,
    delete_appointment,
} = store
const loading = ref(true)
const selected_patient = ref(null)
const edit_mode = ref(false)
const search_value = ref('')
const search_results = ref([])
const search_mode = ref('')
const search_location = ref('patient')

const reload = async (location = null) => {
    if (location) search_location.value = location;
    await search_patients()
    loading.value = false
}

const select_sex = (val) => {
    sex.value = val
    $('#select_sex').dropdown('toggle')
}

const select_search_mode = (val) => {
    search_mode.value = val
    $('#select_search_mode').dropdown('toggle')
}

const update = (obj) => {
    (search_location.value == 'patient') ? update_patient(obj): update_appointment(obj)
    reload()
}

const destroy = (obj) => {
    (search_location.value == 'patient') ? delete_patient(obj): delete_appointment(obj)
    reload()
}
const edit = (patient) => {
    selected_patient.value = patient
    name.value = selected_patient.value.name
    age.value = selected_patient.value.age
    sex.value = selected_patient.value.sex
    father_name.value = selected_patient.value.father_name
    address.value = selected_patient.value.address
    phone_number.value = selected_patient.value.phone_number
    consultant.value = selected_patient.value.consultant_name
}

const search_patients = async () => {
    loading.value = true
    if (search_mode.value == '' || search_value.value == '') {
        loading.value = false
        return data_store.toggleAlert('Search value or category cannot be empty.')
    }
    const res = await init.sendDataToServer('patients/search', 'post', {
        search_mode: search_mode.value,
        search_value: search_value.value,
        search_location: search_location.value,
    })

    loading.value = false
    // success
    if (res.data?.results) {
        return search_results.value = res.data.results
    }
    // found nothing
    return;
}
</script>

<style scoped>
.active {
    background-color: grey !important;
    border: 0 !important;
}
</style>
