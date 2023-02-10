import { ref } from "vue";
import { defineStore } from "pinia";
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

    const reset = () => {
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

        console.log(res);

        // request failed
        if (res.message == 'Request failed with status code 500') return store.toggleAlert('Unknown Error!!!')

        if (res?.response) {
            error_message.value = res.response.data.errors.email[0];
            return store.toggleAlert(res.response.data.errors.email[0]); 
        }

        // request sent success
        store.toggleAlert(res.data.status,false,200)
        setTimeout(() => {
            reset()
            return
        },3000)
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

        console.log(res);

        // reset failed
        if (res.message == 'Request failed with status code 500') return store.toggleAlert('Unknown Error!!!')

        if (res?.response) {
            error_message.value = res.response.data.errors.email[0];
            return store.toggleAlert(res.response.data.errors.email[0]); 
        }

        // reset success
        store.toggleAlert(res.data.status,false,200)
        setTimeout(() => {
            reset()
            router.push({ name: "login" })
            return
        },3000)        
    }

    const login = async () => {
        // validate if the forms are empty
        if (email.value == null || email.value == '') {
            error_message.value ="Your email cannot be empty.";
            return store.toggleAlert("Your email cannot be empty."); 
        }

        // log in
        const res = await init.sendDataToServer('login',"post",{
            email: email.value,
            password: password.value,
        })

        console.log(res);

        // log in failed
        if (res.message == 'Request failed with status code 500') return store.toggleAlert('Unknown Error!!!')

        if (res.message ==  "Request failed with status code 422") {
            error_message.value = "Your email or password is incorrect."
            return store.toggleAlert("Your email or password is incorrect."); 
        }

        if (res.message ==  "Request failed with status code 401") {
            error_message.value = "Your email or password is incorrect."
            return store.toggleAlert("Your email or password is incorrect."); 
        }

        if (res.data?.errors) {
            error_message.value = res.data.errors.message;
            return store.toggleAlert(res.data.errors.message); 
        }

        // log in success
        store.toggleAlert("Log in success!!! Redirecting to home page...",true,200)
        setTimeout(() => {
            reset()
            router.push({ name: "home" })
            return
        },3000)
    }

    const logout = async () => {
        // log out
        const res = await init.sendDataToServer('logout')

        // log in failed
        if (res.message === "Request failed with status code 422") {
            error_message.value ="Your email or password is incorrect.";
            return store.toggleAlert("Your email or password is incorrect."); 
        }

        // log in success
        store.toggleAlert("Log out success!!! Redirecting to login page...",true,200)
        setTimeout(() => {
            router.push({ name: "login" })
            return
        },3000)
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
