<template>
<div class="row mx-0 mx-sm-5 d-block d-xl-flex">
    <h1 class="text-center">
        SETTINGS
    </h1>
    <div class="col-12 col-lg-8 col-xl-6 mx-auto">
        <div class="setting-box form-control pt-4 shadow">
            <div class="mb-3">
                <label for="hospital_name" class="form-label"><strong>Hospital Name:</strong></label>
                <input type="text" class="form-control" name="hospital_name" placeholder="e.g. My Hospital" v-model="hospital_name" disabled>
            </div>
            <hr>
            <!-- <div class="mb-3"> // TO-DO later
                <label class="form-label"><strong>Theme:</strong></label>
                <div class="form-check form-switch ps-0">
                    <label for="theme" class="form-check-label ">{{ theme ? 'Dark' : 'Light' }}</label>
                    <input type="checkbox" class="form-check-input float-none ms-2 align-text-bottom" name="theme" placeholder="e.g. My Hospital" v-model="theme">
                </div>
            </div> -->
            <SubHeader @create_mode="set_create_mode" @click_two="show_set_date" :button_name_two="(selected_consultant == '') ? '' : 'Set Consultant Date'" :route_path="'#create_dialog'" :title="'Consultants:'" :button_name="'Add Consultant'">
                <ListView :style="'height: 331px; overflow: auto;'" :loading="consultant_loading" :array="consultants" :selected_value="selected_consultant" @select="select_consultant" @edit_on="edit_on" />
            </SubHeader>
            <EditDialog :object="selected_consultant !== '' ? selected_consultant : selected_user !== '' ? selected_user : selected_branch !== '' ? selected_branch : ''" :title="selected_consultant !== '' ? 'Consultant' : selected_user !== '' ? 'User' : selected_branch !== '' ? 'Branch' : ''" :edit_mode="edit_mode" @update="update" @edit="edit_values" @close="close" />
            <ConfirmDialog @confirm="destroy">
                <template #title>Are you sure to delete this {{ selected_consultant !== '' ? `consultant named '${selected_consultant.name}'` : selected_user !== '' ?  `user named '${selected_user.name}'` : selected_branch !== '' ? `branch named '${selected_branch.name}'` : ''}} ?</template>
            </ConfirmDialog>
            <CreateDialog @create="create_branch_consultant" @input_data="create_data_object" :title="create_mode == 'branch' ? 'Create A New Branch' : 'Create A New Consultant'" :array="create_mode == 'branch' ? ['name','level','phone_number','address'] : ['name','speciality','designation']" />
            <div id="select_date" class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Set Available Date for {{ selected_consultant.name }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label class="form-label">Set Available Date</label>
                            <input type="date" class="form-control" @input="set_dates.push($event.target.value)">
                            <div class="form-control">
                                <label class="form-label"><strong>Selected Dates:</strong></label>
                                <ListView @remove="remove_set_date" @select="select_set_date" :style="'height:200px; overflow: auto;'" :is_date="true" :loading="false" :selected_value="selected_set_date" :array="set_dates" :empty_msg="'You haven\'t set any dates yet.'"/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-8 col-xl-6 mx-auto">
        <div class="form-control setting-box pt-4 shadow">
            <SubHeader :route_path="'/register'" :title="'Users:'" :button_name="'Add User'">
                <ListView :style="'height: 165px; overflow: auto;'" :loading="user_loading" :array="users" :selected_value="selected_user" @select="select_user" :disabled_edit=true />
            </SubHeader>
            <hr>
            <SubHeader @create_mode="set_create_mode" :route_path="'#create_dialog'" :title="'Branches:'" :button_name="'Add Branch'">
                <ListView :style="'height: 165px; overflow: auto;'" :loading="branch_loading" :array="branches" :selected_value="selected_branch" @select="select_branch" @edit_on="edit_on" />
            </SubHeader>
        </div>
    </div>
</div>
</template>

<script setup>
import ListView from '../components/ListView.vue';
import SubHeader from '../components/Settings/SubHeader.vue';
import CreateDialog from '../components/Settings/CreateDialog.vue';
import {
    useDataStore
} from '../stores/data';
import {
    storeToRefs
} from "pinia";
import {
    onMounted,
    ref
} from 'vue';
import EditDialog from '../components/Settings/EditDialog.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import init from '../helpers/init';

const store = useDataStore();
const create_value = ref({});
const create_mode = ref('')
const selected_set_date = ref('');
const edit_mode = ref(false);
const {
    auth_user,
    hospital_name,
    theme,
    branches,
    users,
    consultants,
    selected_user,
    selected_consultant,
    selected_branch,
    content_loading,
    consultant_loading,
    consultant_available_date_loading,
    user_loading,
    branch_loading,
    set_dates
} = storeToRefs(store);

const {
    initiate_settings
} = store;

onMounted(() => {
    hospital_name.value = auth_user.value ? auth_user.value.setting.hospital_name : 'My Hospital EMRS'
    theme.value = auth_user.value.setting.theme == 'dark' ? true : false
    $('#edit_dialog').on('hide.bs.modal', function () {
        initiate_settings(false)
    })
    $('#confirm_dialog').on('hide.bs.modal', function () {
        initiate_settings(false)
    })
    $('#create_dialog').on('hide.bs.modal', function () {
        initiate_settings(false)
    })
    initiate_settings()
})

const select_branch = val => {
    selected_branch.value = val
    selected_consultant.value = ''
    selected_user.value = ''
}

const select_user = val => {
    selected_branch.value = ''
    selected_consultant.value = ''
    selected_user.value = val
}

const select_consultant = val => {
    selected_branch.value = ''
    selected_consultant.value = val
    selected_user.value = ''
}

const edit_on = val => {
    edit_mode.value = val
}

const close = () => {
    edit_mode.value = false
}

const edit_values = (key, val) => {
    if (selected_user.value !== '') selected_user.value[key] = val
    if (selected_consultant.value !== '') selected_consultant.value[key] = val
    if (selected_branch.value !== '') selected_branch.value[key] = val

    console.log(selected_user.value);
    console.log(selected_branch.value);
    console.log(selected_consultant.value);
}

const update = async () => {
    if (selected_branch.value !== '') {
        const res = await init.sendDataToServer('branch/edit', 'post', selected_branch.value)

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#edit_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }

    if (selected_consultant.value !== '') {
        const res = await init.sendDataToServer('consultant/edit', 'post', selected_consultant.value)

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#edit_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }
}

const destroy = async () => {
    if (selected_user.value !== '') {
        const res = await init.sendDataToServer('user/delete', 'delete', {
            user_id: selected_user.value.id
        })

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#confirm_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }

    if (selected_branch.value !== '') {
        const res = await init.sendDataToServer('branch/delete', 'delete', selected_branch.value)

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#confirm_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }

    if (selected_consultant.value !== '') {
        const res = await init.sendDataToServer('consultant/delete', 'delete', selected_consultant.value)

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#confirm_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }
}

const set_create_mode = val => {
    if (val == 'Consultants:') create_mode.value = 'consultant'
    else create_mode.value = 'branch'
}

const create_data_object = (key, value) => {
    create_value.value[key] = value;
    console.log(create_value.value);
}

const create_branch_consultant = async () => {
    if (create_mode.value == 'consultant') {
        const res = await init.sendDataToServer('consultant/create', 'post', create_value.value)

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#create_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }

    if (create_mode.value == 'branch') {
        const res = await init.sendDataToServer('branch/create', 'post', create_value.value)

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#create_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }

    create_value.value = {}
}

const show_set_date = () => $('#select_date').modal('show')
const select_set_date = (val) => selected_set_date.value = val
const remove_set_date = (val) => set_dates.value.splice(val,1)
</script>

<style scoped>
.form-check-input:checked {
    background-color: grey !important;
    border-color: grey !important;
}
</style>
