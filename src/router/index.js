import { createRouter, createWebHistory } from "vue-router";
import auth_routes from "./routes/auth";
import guest_routes from "./routes/guest";
import { useDataStore } from "../stores/data";
import init from "../helpers/init";
import { storeToRefs } from "pinia";
import { nextTick } from "vue";

const routes = [...auth_routes,...guest_routes]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

function invalid_request() {
    const store = useDataStore()

    store.toggleAlert("You don't have enough priviledge to access this page.")
    return router.push({name: "home"})        
}

router.beforeEach(async (to,from) => {
    const store = useDataStore()
    const { auth_user, page_loading } = storeToRefs(store)

    document.title = 'Loading...'
    page_loading.value = true
    
    if(!await init.initiate()) return false;
    page_loading.value = false

    // already logged in and still trying to access the login page will redirect to the login page
    if (auth_user.value && (to.name == 'login' || to.name == 'forgot_password' || to.name == 'reset_password')) {
        store.toggleAlert("You are already logged in.")
        return router.push({ name: "home" })            
    }

    if (auth_user.value && to.name == 'register' && auth_user.value.rank !== 'admin') invalid_request()           

    if (to.meta.required_auth) {
        if (!auth_user.value && to.name !== 'login') {
            store.toggleAlert("You are not logged in.")
            return { name: "login" }
        }

        if (!auth_user.value && to.name == 'login') {
            return true
        }    
    
        if (auth_user.value && to.name !== 'login') {
            if (auth_user.value.rank !== 'admin') {
                if (to.name == 'settings') invalid_request()
                if (auth_user.value.rank !== 'reception' && to.name == 'reception') invalid_request()
                if (auth_user.value.rank !== 'doctor' && auth_user.value.rank !== 'nurse' && to.name == 'opd') invalid_request()
                if (auth_user.value.rank !== 'doctor' && auth_user.value.rank !== 'nurse' && to.name == 'ipd') invalid_request()
                if (auth_user.value.rank !== 'pharmacist' && to.name == 'pharmacy') invalid_request()

            }
            return true
        }
        
        store.toggleAlert("You are already logged in.")
        return router.push({ name: "home" })        
    }

    return true
})

router.afterEach((to,from)=>{
    nextTick(()=>{
        document.title = to.meta.title || 'My Hospital EMRS'
    })
})

export default router;
