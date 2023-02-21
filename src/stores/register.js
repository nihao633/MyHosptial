import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import init from "../helpers/init";
import router from "../router/index";
import { useDataStore } from "./data";

export const useRegisterStore = defineStore("register_variables", () => {
    const email = ref(null)
    const branch = ref('')
    const name = ref(null)
    const rank = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const invalid_email_msg = ref(null)
    const invalid_name_msg = ref(null)
    const invalid_password_msg = ref(null)

    const reset = () => {
        email.value = null
        name.value = null
        rank.value = 'reception'
        branch.value = ''
        password.value = ''
        password_confirmation.value = ''
        invalid_email_msg.value = null
        invalid_name_msg.value = null
        invalid_password_msg.value = null    
    }

    const register = async () => {
        const store = useDataStore();

        // validate if the inputs meet the requirements
        if (email.value == null || email.value == '') {
            invalid_email_msg.value ="Your email cannot be empty.";
            return store.toggleAlert("Your email cannot be empty."); 
        }

        if (name.value == null || name.value == '') {
            invalid_name_msg.value ="Your name cannot be empty.";
            return store.toggleAlert("Your name cannot be empty."); 
        }

        if (password.value !== password_confirmation.value || password.value == '' || password_confirmation.value == '') {
            invalid_password_msg.value ="Your passwords do not match.";
            return store.toggleAlert("Your passwords do not match."); 
        }

        // register
        const res = await init.sendDataToServer('register',"post",{
            email: email.value.trim(),
            name: name.value.trim(),
            rank: rank.value.trim(),
            branch_id: branch.value.id,
            password_confirmation: password_confirmation.value,
            password: password.value,
        })

        // registeration failed
        if (res.message == 'Request failed with status code 500') return store.toggleAlert('Unknown Error!!!')
        if (res.data?.error == 'You can only create an admin account for a new hospital.') return store.toggleAlert("You aren't logged in. Only admin accounts for new hospitals are allowed.")
        if (res.response?.data.errors) {
            const errors = res.response.data.errors

            Object.keys(errors).forEach(key => {
                if (key == 'email') {
                    invalid_email_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'name') {
                    invalid_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'password') {
                    invalid_password_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
            });

            return;
        }

        // register success
        store.toggleAlert("Registered!!! Redirecting to home page...",true,200)
        setTimeout(() => {
            reset()
            router.push({ name: "home" })
            return
        },3000)
    }     

    return { 
        email,
        name,
        rank,
        branch,
        password,
        password_confirmation,
        invalid_email_msg,
        invalid_name_msg,
        invalid_password_msg,
        register,
    };
});
