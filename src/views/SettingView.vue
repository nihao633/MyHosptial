<template>
<div class="row mx-0 mx-sm-5 d-block d-xl-flex">
    <h1 class="text-center">
        SETTINGS
    </h1>
    <div class="col-12 col-lg-8 col-xl-6 mx-auto">
        <div class="setting-box form-control pt-4 shadow">
            <div class="mb-3">
                <label for="hospital_name" class="form-label"><strong>Hospital Name:</strong></label>
                <input type="text" class="form-control custom-disabled" name="hospital_name" placeholder="e.g. My Hospital" v-model="hospital_name" :readonly="true" @change="save_settings()" @dblclick="$event.target.readOnly=''" @blur="$event.target.readOnly=true">
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
                <ListView :type="'consultant'" :style="'height: 331px; overflow: auto;'" :loading="consultant_loading" :array="consultants" :selected_value="selected_consultant" @select="select_consultant" @edit_on="edit_on" />
            </SubHeader>
            <EditDialog :object="selected_consultant !== '' ? selected_consultant : selected_user !== '' ? selected_user : selected_branch !== '' ? selected_branch : ''" :title="selected_consultant !== '' ? 'Consultant' : selected_user !== '' ? 'User' : selected_branch !== '' ? 'Branch' : ''" :edit_mode="edit_mode" @update="update" @edit="edit_values" @close="close" />
            <ConfirmDialog @confirm="destroy">
                <template #title>Are you sure to delete this {{ selected_consultant !== '' && selected_set_date == '' ? `consultant named '${selected_consultant.name}'` : selected_user !== '' ?  `user named '${selected_user.name}'` : selected_branch !== '' ? `branch named '${selected_branch.name}'` : selected_set_date !== '' ? `this date ${selected_set_date.date_available}` : ''}} ?</template>
            </ConfirmDialog>
            <CreateDialog @create="create_branch_consultant" @input_data="create_data_object" :title="create_mode == 'branch' ? 'Create A New Branch' : 'Create A New Consultant'" :array="create_mode == 'branch' ? ['name','level','phone_number','address'] : ['name','speciality','designation']" />
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
    <SelectDate @submit="save_dates()" :selected_consultant="selected_consultant" :array="set_dates">
        <ListView @remove="remove_set_date" @select="select_set_date" :style="'height:200px; overflow: auto;'" :is_date="true" :loading="false" :selected_value="selected_set_date" :array="set_dates" :empty_msg="'You haven\'t set any dates yet.'" />
    </SelectDate>
    <DateEdit :title="'Manage Consultant Appointment Dates'">
        <ListView :style="'height: 200px; overflow: auto;'" :type="'consultant_dates'" @select="select_available_date" :loading="consultant_available_date_loading" :array="consultant_dates" :selected_value="selected_set_date"/>
    </DateEdit>
</div>
</template>

<script setup>
import router from '../router/index.js';
import DateEdit from '../components/Settings/DateEdit.vue';
import SelectDate from '../components/Settings/SelectDate.vue';
import ListView from '../components/_Global_/ListView.vue';
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
import ConfirmDialog from '../components/_Global_/ConfirmDialog.vue';
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
    consultant_loading,
    consultant_available_date_loading,
    user_loading,
    branch_loading,
    set_dates,
    consultant_dates
} = storeToRefs(store);

const {
    initiate_settings,
    load_consultant_dates
} = store;

onMounted(() => {
    hospital_name.value = auth_user.value ? auth_user.value.setting.hospital_name : 'My Hospital EMRS'
    theme.value = auth_user.value ? (auth_user.value.setting.theme == 'dark' ? true : false) : false
    $('#show_dates').on('show.bs.modal', async function() {
        load_consultant_dates()
    })

    $('#show_dates').on('hide.bs.modal', async function() {
        selected_set_date.value = ''
    })
    
    $('#edit_dialog').on('hide.bs.modal', function () {
        initiate_settings(false)
    })
    $('#confirm_dialog').on('hide.bs.modal', function () {
        initiate_settings(false)
        selected_set_date.value = ''
    })
    $('#create_dialog').on('hide.bs.modal', function () {
        initiate_settings(false)
    })
    $('#select_date').on('hide.bs.modal', function () {
        set_dates.value = []
        $('#date_selector').val('')
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

    if (selected_consultant.value !== '' && selected_set_date.value == '') {
        const res = await init.sendDataToServer('consultant/delete', 'delete', selected_consultant.value)

        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return
        }

        $('#confirm_dialog').modal('toggle')
        store.toggleAlert(res.data.status, false, 200)
        return
    }

    if (selected_set_date.value !== '') {
        const res = await init.sendDataToServer('consultants/delete_date', 'delete',{
            consultant_id:  selected_consultant.value.id,
            date_available: selected_set_date.value.date_available
        })

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
const select_available_date = val => selected_set_date.value = val
const remove_set_date = (val) => set_dates.value.splice(val,1)

const save_dates = async () => {
    const res = await init.sendDataToServer('consultants/set_date','post',{
        dates: set_dates.value,
        consultant_id: selected_consultant.value.id,
    })

    if (res?.response) return store.toggleAlert(res.response.data.message)
    
    $('#select_date').modal('hide')
    return store.toggleAlert(res.data.status,false,200)
}

const save_settings = async () => {
    const res = await init.sendDataToServer('users/settings', 'post', {
        hospital_name: hospital_name.value,
        theme: theme.value
    })  

    router.go(0)   
}
</script>

<style scoped>
.form-check-input:checked {
    background-color: grey !important;
    border-color: grey !important;
}

.custom-disabled:read-only {
    background: rgb(192, 190, 190);
    color: white;
    cursor: default;
}
</style>
