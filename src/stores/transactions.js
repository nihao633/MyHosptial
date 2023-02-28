import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import init from "../helpers/init";
import { useDataStore } from "./data";

export const useTransactionStore = defineStore('transaction_variables',()=>{
    const transactions = ref([])
    const sale_records = ref([])
    
    const initiate = async () => {
        const store = useDataStore()
        const {
            content_loading
        } = storeToRefs(store)

        content_loading.value = true
        const res = await init.sendDataToServer('sale_records')
        content_loading.value = false
        transactions.value = res.data.transactions
        sale_records.value = res.data.sale_records

        sale_records.value.forEach((record)=>{
            delete record.id
            delete record.hospital_id
            delete record.branch_id
        })

        console.log(res);
    }

    return {
        initiate,
        transactions,
        sale_records
    }
})