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
    
    const initiate_settings = async () => {
        users.value = []
        consultants.value = []
        branches.value = []
        selected_user.value = ''
        selected_consultant.value = ''
        selected_branch.value = ''

        content_loading.value = true

        const res_users = await init.sendDataToServer('users');
        const res_consultants = await init.sendDataToServer('consultants');
        const res_branches = await init.sendDataToServer('branches','post');

        content_loading.value = false

        users.value = res_users.data.users
        consultants.value = res_consultants.data.consultants
        branches.value = res_branches.data.branches

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
    };
});
