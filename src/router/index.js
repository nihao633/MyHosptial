import { createRouter, createWebHistory } from "vue-router";
import auth_routes from "./routes/auth";
import guest_routes from "./routes/guest";
import routes_404 from "./routes/404";
import { useDataStore } from "../stores/data";
import init from "../helpers/init";
import { storeToRefs } from "pinia";
import { nextTick } from "vue";

const routes = [...auth_routes,...guest_routes,... routes_404]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

function invalid_request() {
    const store = useDataStore()

    store.toggleAlert("You don't have enough privilege to access this page.")
    return router.push({name: "home"})        
}

router.beforeEach(async (to,from) => {
    const store = useDataStore()
    const { auth_user, page_loading } = storeToRefs(store)

    page_loading.value = true
    document.title = 'Loading...'
    
    if(to.name == 'contact' || to.name == 'about') {
        page_loading.value = false
        return true
    }

    await init.initiate();
        
    // already logged in and still trying to access the login page will redirect to the login page
    if (auth_user.value && (to.name == 'login' || to.name == 'forgot_password' || to.name == 'reset_password')) {
        return router.push({ name: "home" })            
    }

    if (auth_user.value && to.name == 'register' && auth_user.value.rank !== 'admin') invalid_request()  

    if (to.meta.required_auth) {
        if (!auth_user.value && to.name !== 'login') return { name: "login" }
        if (!auth_user.value && to.name == 'login') return true 
        if (auth_user.value && to.name !== 'login') {
            if (auth_user.value.rank !== 'admin') {
                if (to.name == 'settings') invalid_request()
                if (auth_user.value.rank !== 'reception' && to.name == 'reception') invalid_request()
                if (auth_user.value.rank !== 'doctor' && auth_user.value.rank !== 'nurse' && to.name == 'opd') invalid_request()
                if (auth_user.value.rank !== 'doctor' && auth_user.value.rank !== 'nurse' && to.name == 'ipd') invalid_request()
                if (auth_user.value.rank !== 'lab technician' && to.name == 'lab') invalid_request()
                if (auth_user.value.rank !== 'xray technician' && to.name == 'imaging') invalid_request()
                if (auth_user.value.rank !== 'pharmacist' && to.name == 'pharmacy') invalid_request()
                if (auth_user.value.rank !== 'accountant' && auth_user.value.rank !== 'cashier' && to.name == 'pos') invalid_request()
                if (auth_user.value.rank !== 'accountant' && to.name == 'transactions') invalid_request()
            }
            
            return true
        }

        return router.push({ name: "home" })        
    }

    return true
})

router.afterEach((to,from)=>{
    const store = useDataStore()
    const {
        page_loading
    } = storeToRefs(store)

    nextTick(()=>{
        setTimeout(() => {
            document.title = to.meta.title || 'My Hospital EMRS'
            page_loading.value = false
        }, 2000);
    })
})

export default router;
