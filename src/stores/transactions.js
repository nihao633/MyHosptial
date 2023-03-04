import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import init from "../helpers/init";
import { useDataStore } from "./data";

export const useTransactionStore = defineStore('transaction_variables',()=>{
    const store = useDataStore()
    const {content_loading} = storeToRefs(store)
    const transactions = ref([])
    const sale_records = ref([])
    const branches = ref([])
    const edit_row = ref(false)
    const selected_row = ref(null)
    const search_timer = ref(0)
    const searching = ref(null)
    const not_found = ref(false)
    const search_object = ref(new Object())
    const selected_branch = ref('All Branches')

    const reset = () => {
        transactions.value = []
        sale_records.value = []
        branches.value = []
        edit_row.value = false
        selected_row.value = null
        search_timer.value = 0
        searching.value = null
        not_found.value = false
        search_object.value = new Object()
    }

    const initiate = async () => {
        reset()

        if(selected_branch.value !=='All Branches') search_object.value.branch_id = selected_branch.value.id

        content_loading.value = true
        const res = await init.sendDataToServer('sale_records','post',search_object.value)
        content_loading.value = false
        transactions.value = res.data.transactions
        sale_records.value = res.data.sale_records
        branches.value = res.data.branches

        transactions.value.forEach(trans => {
            delete trans.created_at
            delete trans.updated_at
            delete trans.deleted_at
        })

        sale_records.value.forEach((record,index)=>{
            transactions.value.forEach(trans => {
                if(record.transaction_id == trans.id) {
                    sale_records.value[index] = {...record,...trans}
                }
            })
        })

        sale_records.value.forEach((record)=>{
            delete record.id
            delete record.hospital_id
            delete record.branch_id
            delete record.drug_id
        })
    }

    const select_row = val => selected_row.value = val

    // const edit_mode_on = () => edit_row.value = true

    // const begin_edit = async (key,value,key_code) => {
    //     clearTimeout(search_timer.value)
    //     search_timer.value = setTimeout(async () => {
    //         selected_row.value[key] = value
    //         if(key_code == "Enter") {
    //             edit_row.value = false
    //             // await init.sendDataToServer('dispense_record/edit','post',selected_row.value)
    //             initiate()
    //         }
    //     }, 1000);
    // }

    // const pause_edit = () => {
    //     clearTimeout(search_timer.value)
    // }

    const begin_search = (key,value) => {
        clearTimeout(search_timer.value)
        search_timer.value = setTimeout(async () => {
            search_object.value[key] = value
            const res = await init.sendDataToServer('sale_records','post',search_object.value)
            searching.value = false

            if(res.data.sale_records.length == 0) return not_found.value = true
            if(res.data.transactions.length == 0) return not_found.value = true

            transactions.value = res.data.transactions
            sale_records.value = res.data.sale_records

            transactions.value.forEach(trans => {
                delete trans.created_at
                delete trans.updated_at
                delete trans.deleted_at
            })

            sale_records.value.forEach((record,index)=>{
                transactions.value.forEach(trans => {
                    if(record.transaction_id == trans.id) {
                        sale_records.value[index] = {...record,...trans}
                    }
                })
            })

            sale_records.value.forEach((record)=>{
                delete record.id
                delete record.hospital_id
                delete record.branch_id
                delete record.drug_id
            })

        }, 1000);
    }

    const pause_search = () => {
        searching.value = true
        not_found.value = false
        clearTimeout(search_timer.value)
    }

    const select_branch = async (val) => {    
        selected_branch.value = ''
        search_object.value.branch_id = ''
        if(val !=='All Branches') selected_branch.value = val
        await initiate()
    }

    return {
        select_row,
        // edit_mode_on,
        // begin_edit,
        // pause_edit,
        begin_search,
        pause_search,
        select_branch,
        initiate,
        sale_records,
        branches,
        // edit_row,
        selected_row,
        searching,
        not_found,
        selected_branch
    }
})