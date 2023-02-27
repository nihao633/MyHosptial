import axios from "axios";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const _SERVER_ADDR = (import.meta.env.MODE == 'production') ? import.meta.env.VITE_SERVER_ADDRESS : import.meta.env.VITE_DEV_SERVER_ADDRESS;
const current_time = ref('Loading...')
const is_server_up = ref(true)

const setCurrentTime = () => {
    let date = new Date()
    current_time.value = date.toDateString() + ' ' + (date.getHours() > 12 ? Math.floor(date.getHours() / 2) : date.getHours()) + ':' + (date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds().toString().length == 1 ? '0' + date.getSeconds() : date.getSeconds()) + (date.getHours() > 12 ? ' PM' : ' AM')
    setCurrentTimeTimer();
}

const setCurrentTimeTimer = ()=>{
    setTimeout(() => {
        setCurrentTime()
    }, 1000);
}

const sendDataToServer = (_url = '',method_type = "get",data = null) => {
    const res = axios({
        method: method_type,
        url: _SERVER_ADDR + _url,
        data: data,
    }).then((res) => {
        return res;
    }).catch((err) => {
        return err
    })

    return res
}

const initiate = async (check_only = true) => {    
    const store = useDataStore();
    const { 
        auth_user,
        page_loading,
     } = storeToRefs(store);

    page_loading.value = true // show loading
    if(check_only) page_loading.value = false

    const res = await sendDataToServer('init');

    setTimeout(() => {
        page_loading.value = false // hide loading
    }, 2000);

    // check whether the back-end server or database server is down
    if (res.message === "Network Error" || res.data?.db_status === "down") {
        return is_server_up.value = false;
    }

    auth_user.value = res.data.auth_user
    return is_server_up.value = true;
};

export default { 
    initiate, 
    sendDataToServer, 
    setCurrentTimeTimer, 
    current_time,
    is_server_up 
};
