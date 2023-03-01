import { storeToRefs } from 'pinia';
import {
    useOpdStore
} from '@/stores/medicord';
import router from '@/router';
import { 
    onMounted
} from 'vue';

export function useMedicordComposable() {
    const tabs = [
        'create',
        'manage'
    ]
    const store = useOpdStore();
    const { 
        current_tab 
    } = storeToRefs(store);
    const { 
        reset 
    } = store;
    
    const initiate = (val) =>{
        current_tab.value=val;
        router.push(tabs[val]);
        reset();
    }
    
    onMounted(()=>{
        const full_path = router.currentRoute.value.fullPath.split('/')
        current_tab.value = tabs.indexOf(full_path[full_path.length - 1].toLowerCase())
    })    

    return {
        initiate,
        tabs,
        current_tab
    }
}
