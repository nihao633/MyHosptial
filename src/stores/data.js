import { ref } from "vue";
import { defineStore } from "pinia";
import init from '../helpers/init'

export const useDataStore = defineStore("global_variables", () => {
    const content_loading = ref(true);
    const page_loading = ref(true);
    const alert_loading = ref(false);
    const alert_status = ref(200);
    const alert_message = ref(null);
    const auth_user = ref(null);
    const hospital_name = ref('');
    const theme = ref('');
    const selected_user = ref('');
    const selected_consultant = ref('');
    const selected_branch = ref('');
    const users = ref([]);
    const consultants = ref([]);
    const branches = ref([]);
    const set_dates = ref([]);
    const consultant_dates = ref([]);
    const consultant_loading = ref(true);
    const user_loading = ref(true);
    const branch_loading = ref(true);
    const consultant_available_date_loading = ref(true);
    
    const initiate_settings = async (reload = true) => {
        if(reload) {
            user_loading.value = true
            consultant_loading.value = true
            branch_loading.value = true
            selected_user.value = ''
            selected_consultant.value = ''
            selected_branch.value = ''
            users.value = []
            consultants.value = []
            branches.value = []    
        }

        if(selected_user.value !== '') {
            user_loading.value = true
            users.value = []
        }

        if(selected_consultant.value !== '') {
            consultant_loading.value = true
            consultants.value = []
        }
        if(selected_branch.value !== '') {
            branch_loading.value = true
            branches.value = []
        }

        const res_users = await init.sendDataToServer('users');
        const res_consultants = await init.sendDataToServer('consultants');
        const res_branches = await init.sendDataToServer('branches','post');


        content_loading.value = false
        user_loading.value = false
        consultant_loading.value = false
        branch_loading.value = false

        if(reload) {
            users.value = res_users.data.users
            consultants.value = res_consultants.data.consultants
            branches.value = res_branches.data.branches    
        }

        if(selected_user.value !== '') users.value = res_users.data.users
        if(selected_consultant.value !== '') consultants.value = res_consultants.data.consultants
        if(selected_branch.value !== '') branches.value = res_branches.data.branches

        users.value.forEach((value)=>{
            delete value.created_at
            delete value.deleted_at
            delete value.updated_at
            delete value.hospital_id
            delete value.setting
        })

        consultants.value.forEach((value)=>{
            delete value.created_at
            delete value.deleted_at
            delete value.updated_at
            delete value.hospital_id
        })

        branches.value.forEach((value)=>{
            delete value.created_at
            delete value.deleted_at
            delete value.updated_at
            delete value.hospital_id
        })
    }

    async function load_consultant_dates() {
        consultant_available_date_loading.value = true
        const res_consultant_dates = await init.sendDataToServer('consultants/available?consultant_id=' + selected_consultant.value.id)
        consultant_available_date_loading.value = false
    
        consultant_dates.value = res_consultant_dates.data.available_dates

        consultant_dates.value.forEach(val => {
            delete val.id
            delete val.consultant_id
            delete val.hospital_id
            delete val.deleted_at
            delete val.created_at
            delete val.updated_at
        })
    }

    function toggleAlert(message, loading, status) {
        alert_message.value = message;
        alert_status.value = status;
        alert_loading.value = loading;
        setTimeout(() => {
            alert_loading.value = false;
            alert_status.value = 200;
            alert_message.value = null;
        }, 5000);
    } 

    return { 
        toggleAlert,
        initiate_settings,
        load_consultant_dates,
        selected_user,
        selected_branch,
        selected_consultant,
        alert_status,
        alert_message,
        alert_loading,
        content_loading,
        page_loading,
        auth_user,
        hospital_name,
        theme,
        branches,
        consultants,
        users,
        set_dates,
        consultant_loading,
        consultant_available_date_loading,
        user_loading,
        branch_loading,
        consultant_dates
    };
});
