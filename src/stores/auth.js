import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import init from "../helpers/init";
import { useDataStore } from "./data";
import router from "../router/index";

export const useAuthStore = defineStore("auth_variables", () => {
    const reset_time = ref('')
    const email = ref(null)
    const password = ref(null)
    const password_confirmation = ref(null)
    const token = ref(null)
    const error_message = ref(null)
    const store = useDataStore()
    const {
        content_loading,
    } = storeToRefs(store)

    // check cookie for the current authenticated user
    const cookie_exists = () => { 
        return decodeURIComponent(document.cookie).split(';').indexOf('password_reset=true') > -1
    }
    
    const reset = (reload = false) => {
        reset_time.value = '';
        if(cookie_exists() || reload) {
            reset_time.value = 60
            content_loading.value = true
            let id = setInterval(() => {
                reset_time.value -= 1
                if(reset_time.value < 1) {
                    clearInterval(id)
                    reset_time.value = '';
                    document.cookie = `password_reset=true; expires=Thu, 01 Jan 1920 00:00:00 UTC; path=/forget-password;`    
                    return content_loading.value = false
                }
            }, 1000);
        }
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

        // validate if cookie exists
        if (cookie_exists()) return;

        // loading to disable the request button
        content_loading.value = true

        // send request
        const res = await init.sendDataToServer('forgot-password',"post",{
            email: email.value,
        })

        // request failed
        if (res.message == 'Request failed with status code 500') {
            content_loading.value = false
            return store.toggleAlert('Unknown Error!!!')
        }

        if (res?.response) {
            content_loading.value = false
            error_message.value = res.response.data.errors.email[0];
            return store.toggleAlert(res.response.data.errors.email[0]); 
        }

        const date = new Date();
        date.setTime(date.getTime() + 864000)
        document.cookie = `password_reset=true; expires=${date.toUTCString()}; path=/forget-password;`    

        // request sent success
        store.toggleAlert(res.data.status,false,200)
        reset(true)
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

        // log in failed
        if (res.message === "Request failed with status code 422") {
            error_message.value ="Your email or password is incorrect.";
            return store.toggleAlert("Your email or password is incorrect."); 
        }

        // log in success
        store.toggleAlert(res.data.message,false,200)
        return router.push({ name: "login" })
    }        

    return { 
        email,
        password,
        password_confirmation,
        token,
        error_message,
        reset_time,
        login,
        logout,
        reset,
        reset_password,
        request_password_reset,
    };
});
