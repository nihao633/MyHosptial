<template>
    <Tabs :tab_one="'Patients'" :tab_two="'Appointments'" :current_section="current_section" @reload="reload" v-if="data_store.auth_user.rank == 'admin'"/>
<div class="list-group form-control p-2">
    <a v-if="!loading && current_section == 1" v-for="patient in patients" role="button" @click="edit(patient)" class="list-group-item list-group-item-action" :class="{ active: selected_patient == patient}">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ patient.name }}</h5><em class="me-auto"><small>&nbsp;(Client ID: {{ patient.id }})</small></em>
            <small>{{ patient.sex }}</small>
        </div>
        <p class="mb-1"><strong>Age: </strong>{{ patient.age }}</p>
        <div>
            <strong> Phone Number: </strong>{{ patient.phone_number }}
        </div>
        <div v-if="selected_patient !== null && selected_patient == patient" class="bottom-0 end-0 position-absolute bg-white shadow">
            <button class="btn btn-mine text-secondary" title="view more" data-bs-target="#patient_dialog" data-bs-toggle="modal"><i class="fa-solid fa-eye"></i></button>
            <button class="btn btn-mine text-secondary" title="print" @click="print_record()"><i class="fa-solid fa-print"></i></button>
            <button class="btn btn-mine text-secondary" title="edit" data-bs-target="#patient_dialog" data-bs-toggle="modal" @click="edit_mode = true"><i class="fa-solid fa-file-pen"></i></button>
            <button class="btn btn-mine text-danger" title="delete" data-bs-target="#confirm_dialog" data-bs-toggle="modal"><i class="fa-solid fa-trash"></i></button>
        </div>
    </a>
    <a v-if="!loading && current_section == 2" v-for="appointment in appointments" role="button" @click="edit(appointment)" class="list-group-item list-group-item-action" :class="{ active: selected_patient == appointment}">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ appointment.name }}</h5><em class="me-auto"><small>&nbsp;(Appointment ID: {{ appointment.id }})</small></em>
            <small>{{ appointment.sex }}</small>
        </div>
        <p class="mb-1"><strong>Inteded Date of Visit: </strong>{{ appointment.intended_date_of_visit }}</p>
        <p class="mb-1"><strong>Age: </strong>{{ appointment.age }}</p>
        <div>
            <strong> Phone Number: </strong>{{ appointment.phone_number }}
        </div>
        <small><strong>Consultant's Name: </strong>{{ appointment.consultant_name }}</small>
        <div v-if="selected_patient !== null && selected_patient == appointment" class="bottom-0 end-0 position-absolute bg-white shadow">
            <button class="btn btn-mine text-secondary" title="view more" data-bs-target="#patient_dialog" data-bs-toggle="modal"><i class="fa-solid fa-eye"></i></button>
            <button class="btn btn-mine text-secondary" title="print" @click="print_record()"><i class="fa-solid fa-print"></i></button>
            <button class="btn btn-mine text-secondary" title="edit" data-bs-target="#patient_dialog" data-bs-toggle="modal" @click="edit_mode = true"><i class="fa-solid fa-file-pen"></i></button>
            <button class="btn btn-mine text-danger" title="delete" data-bs-target="#confirm_dialog" data-bs-toggle="modal"><i class="fa-solid fa-trash"></i></button>
        </div>
    </a>
    <div v-if="!loading && current_section == 2 && appointments.length == 0">
        There aren't any appointments to display.
    </div>
    <div v-if="!loading && current_section == 1 && patients.length == 0">
        There aren't any patients to display.
    </div>
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
    <div class="modal fade" data-bs-backdrop="static" id="patient_dialog" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ edit_mode ? 'Edit' : 'View' }} {{ current_section == 1 ? 'Patient' : 'Appointment' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" @click="edit_mode = false"></button>
                </div>
                <div class="modal-body">
                    <p v-if="current_section == 2"><strong>Intended Date of Visit: </strong>{{ selected_patient?.intended_date_of_visit }}</p>
                    <strong class="text-danger d-block mb-3" v-if="edit_mode && current_section == 2">* <em>Please <a href="#" title="delete" data-bs-target="#confirm_dialog" data-bs-toggle="modal">delete</a> this appointment to update the appointment date.</em></strong>
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
                            <ul class="dropdown-menu form-control">
                                <li role="button" class="p-3 custom-select-button" v-for="val in ['male','female']" @click="sex = val">{{ val.charAt(0).toUpperCase() + val.slice(1) }}</li>
                            </ul>
                        </li>
                    </p>
                    <div class="mb-3" v-if="invalid_sex_msg">
                        <span class="text-white badge bg-danger">{{ invalid_sex_msg }}</span>
                    </div>
                    <p v-if="current_section == 1"><strong><strong class="text-danger" v-if="edit_mode">*</strong>Father's Name: </strong>{{ edit_mode ? '' : selected_patient?.father_name }}<input class="form-control" type="text" v-model="father_name" v-if="edit_mode" @mousedown="invalid_father_name_msg = null"></p>
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
                    <p v-if="current_section == 2"><strong><strong class="text-danger" v-if="edit_mode">*</strong>Consultant's Name: </strong>{{ edit_mode ? '' : selected_patient?.consultant_name }}<input class="form-control" type="text" v-model="consultant" v-if="edit_mode" @mousedown="invalid_consultant_name_msg = null"></p>
                    <div class="mb-3" v-if="invalid_consultant_name_msg">
                        <span class="text-white badge bg-danger">{{ invalid_consultant_name_msg }}</span>
                    </div>
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
            Are you sure to delete {{ current_section == 1 ? ' this patient named ' : ' this appointment for ' }} {{ selected_patient?.name }}?
        </template>

    </ConfirmDialog>
    <div class="modal" tabindex="-1" id="confirm_dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="card ms-auto py-4 d-none">
        <h4 class="text-center my-3">Print Preview:</h4>
        <div class="mx-auto w-75 my-4 form-control" id="print_register">
            <p>Name: {{ name }} <em>({{ current_section == 1 ? ' Client ID: ' : 'Appointment ID: '}} {{ 
                selected_patient?.id }})</em></p>
            <p>Age: {{ age }}/{{ sex }}</p>
            <p>Address: {{ address }}</p>
            <p>Phone No: {{ phone_number }}</p>
        </div>
    </div>
</div>
</template>

<script setup>
import ConfirmDialog from '../_Global_/ConfirmDialog.vue';
import Tabs from '../_Global_/_tabs.vue';
import {
    storeToRefs
} from 'pinia';
import { 
    useDataStore 
} from '../../stores/data';
import {
    useReceptionStore
} from '../../stores/reception';
import {
    onMounted,
    ref
} from 'vue';
import init from '../../helpers/init';

const data_store = useDataStore();
const store = useReceptionStore();
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
const patients = ref(null)
const appointments = ref(null)
const loading = ref(true)
const selected_patient = ref(null)
const edit_mode = ref(false)
const current_section = ref(1)

const reload = async (val=null) => {
    if(!val) val = 1
    current_section.value = val
    loading.value = true
    const res = await init.sendDataToServer('patients');
    const res_appointments = await init.sendDataToServer('patients/appointment');
    loading.value = false
    patients.value = res.data?.patients
    appointments.value = res_appointments.data?.appointments
}

const update = (obj) => {
    (current_section.value == 1) ? update_patient(obj): update_appointment(obj)
    reload()
}

const destroy = (obj) => {
    (current_section.value == 1) ? delete_patient(obj): delete_appointment(obj)
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

onMounted(async () => {
    await reload();
})
</script>

<style scoped>
.active {
    background-color: #1d92cf !important;
    border: 0 !important;
}
</style>