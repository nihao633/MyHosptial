import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import init from "../helpers/init";
import { useDataStore } from "./data";
import router from "../router/index";

export const useAuthStore = defineStore("auth_variables", () => {
    const email = ref(null)
    const password = ref(null)
    const password_confirmation = ref(null)
    const token = ref(null)
    const error_message = ref(null)
    const store = useDataStore()
    const {
        content_loading,
    } = storeToRefs(store)
    
    const reset = (reload = false) => {
        email.value = null
        password.value = null
        error_message.value = null
    }

    // request password reset
    const request_password_reset = async () => {
        // validate if the forms are empty
        if (email.value == null || email.value == '') {
            error_message.value ="Your email cannot be empty.";
            return store.toggleAlert("Your email cannot be empty."); 
        }

        // send request
        const res = await init.sendDataToServer('forgot-password',"post",{
            email: email.value,
        })

        // request failed
        if (res.message == 'Request failed with status code 500') {
            return store.toggleAlert('Unknown Error!!!')
        }

        // errors
        if (res.response?.data.errors) {
            const errors = res.response.data.errors

            Object.keys(errors).forEach(key => {
                error_message.value = errors[key][0];

                return store.toggleAlert(error_message.value); 
            });
            return;
        }

        store.toggleAlert(res.data.status,false,200)
        reset()
    }

    const reset_password = async () => {
        // validate if the passwords match
        if (password.value !== password_confirmation.value) {
            error_message.value ="Your passwords do not match.";
            return store.toggleAlert("Your passwords do not match."); 
        }

        // send reset
        const res = await init.sendDataToServer('reset-password',"post",{
            token: token.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        })

        // reset failed
        if (res.message == 'Request failed with status code 500') return store.toggleAlert('Unknown Error!!!')

        // errors
        if (res.response?.data.errors) {
            const errors = res.response.data.errors

            Object.keys(errors).forEach(key => { 
                error_message.value = errors[key][0];
                   
                return store.toggleAlert(error_message.value); 
            });
            
            return;
        }

        // reset success
        store.toggleAlert(res.data.status,false,200)
        reset()
        return router.push({ name: "login" })
    }

    const login = async () => {
        // validate if the forms are empty
        if (email.value == null || email.value == '') {
            error_message.value ="Your email cannot be empty.";
            return store.toggleAlert(error_message.value); 
        }

        // log in
        const res = await init.sendDataToServer('login',"post",{
            email: email.value,
            password: password.value,
        })

        // log in failed
        if (
            res.message == 'Request failed with status code 500' ||
            res.message ==  "Request failed with status code 422" ||
            res.message ==  "Request failed with status code 401"
        ) error_message.value = "Your email or password is incorrect."

        if (res.data?.errors) error_message.value = res.data.errors.message;

        if (error_message.value) return store.toggleAlert(error_message.value)
        
        // log in success
        store.toggleAlert(res.data.message,false,200)
        return router.push({ name: "home" })
    }

    const logout = async () => {
        // log out
        const res = await init.sendDataToServer('logout')

        // log out success
        store.toggleAlert(res.data.message,false,200)
        return router.push({ name: "login" })
    }        

    return { 
        email,
        password,
        password_confirmation,
        token,
        error_message,
        login,
        logout,
        reset,
        reset_password,
        request_password_reset,
    };
});
