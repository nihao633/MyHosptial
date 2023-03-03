import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import init from '../helpers/init';
import { useDataStore } from "./data";
import { usePosStore } from "./pos";

export const usePharmacyStore = defineStore("pharmacy_variables", () => {
    const store = useDataStore();
    const { content_loading } = storeToRefs(store);
    const pos_store = usePosStore();
    const {
        searching
    } = storeToRefs(pos_store);
    const expired_list = ref(false);
    const edit_row = ref(false);
    const current_tab = ref(0);
    const current_section = ref(1)
    const selected_branch = ref('')
    const selected_row = ref('')
    const drug_stock_id = ref('')
    const brand_name = ref('')
    const generic_name = ref('')
    const drug_form = ref('')
    const drug_dosage = ref('')
    const purchased_date = ref('')
    const purchased_price = ref('')
    const purchased_quantity = ref('')
    const expiry_date = ref('')
    const dispensed_amount = ref('')
    const purchase_records = ref([])
    const branches = ref([])
    const dispense_records = ref([])
    const drugs = ref([])
    const stock_report = ref([])
    const branch_id = ref('')
    const selected_drug = ref('')


    const initiate_pharmacy_create = async () => {
        selected_drug.value = ''
        drugs.value = []
        brand_name.value = ''
        generic_name.value = ''
        drug_form.value = ''
        drug_dosage.value = ''
        purchased_date.value = ''
        purchased_price.value = ''
        purchased_quantity.value = ''
        expiry_date.value = '' 
        content_loading.value = true
        const res = await init.sendDataToServer('drugs')

        drugs.value = res.data.drugs
        content_loading.value = false
    }

    const initiate_purchase_records = async () => {
        content_loading.value = true
        edit_row.value = false
        selected_row.value = ''
        brand_name.value = ''
        generic_name.value = ''
        drug_form.value = ''
        drug_dosage.value = ''    
        purchase_records.value = []

        const res_purchase_records = await init.sendDataToServer('purchase_records','post')

        purchase_records.value = res_purchase_records.data.purchase_records
        
        purchase_records.value.forEach((value,index)=>{
            drugs.value.forEach((drug,)=>{
                if(drug.id === value.drug_id) purchase_records.value[index] = { ...drug,...purchase_records.value[index] }
            })
        })

        purchase_records.value.forEach((value)=>{
            delete value.hospital_id
            delete value.purchased_voucher_id
            delete value.drug_id
            delete value.deleted_at
            delete value.created_at
            delete value.updated_at
        })
        content_loading.value = false;
    }

    const initiate_pharmacy_dispense_create = async () => {
        selected_drug.value = ''
        dispensed_amount.value = ''
        selected_branch.value = ''
        drugs.value = []
        branches.value = []
        brand_name.value = ''
        generic_name.value = ''
        drug_form.value = ''
        drug_dosage.value = ''
        purchased_date.value = ''
        purchased_price.value = ''
        purchased_quantity.value = ''
        expiry_date.value = '' 
        content_loading.value = true
        const res = await init.sendDataToServer('drugs')

        const res_branches = await init.sendDataToServer('branches','post')

        drugs.value = res.data.drugs

        res_branches.data.branches.forEach((value,index)=>{
            if(value.level !== 0) branches.value.push(value)
        })

        searching.value = null

        content_loading.value = false
    }

    const initiate_dispense_records = async () => {
        content_loading.value = true
        edit_row.value = false
        selected_row.value = ''
        brand_name.value = ''
        generic_name.value = ''
        drug_form.value = ''
        drug_dosage.value = ''  
        branches.value = []  
        dispense_records.value = []
        drugs.value = []

        const res_dispense_records = await init.sendDataToServer('dispense_records','post')

        branches.value = res_dispense_records.data.branches
        dispense_records.value = res_dispense_records.data.dispense_records
        drugs.value = res_dispense_records.data.drugs

        dispense_records.value.forEach((value,index)=>{
            drugs.value.forEach((drug)=>{
                if(drug.id === value.drug_id) dispense_records.value[index] = { ...drug,...dispense_records.value[index] }
            })
            branches.value.forEach((branch)=>{
                if(branch.id === value.to) dispense_records.value[index].to = branch.name
                if(branch.id === value.from) dispense_records.value[index].from = branch.name
            })
        })

        dispense_records.value.forEach((value)=>{
            delete value.hospital_id
            delete value.drug_id
            delete value.deleted_at
            delete value.created_at
            delete value.updated_at
            delete value.purchase_record
        })
        content_loading.value = false;
    }

    const initiate_pharmacy_inventory = async () => {
        stock_report.value = []
        branches.value = []
        content_loading.value = true
        const res = await init.sendDataToServer('drug_stocks','post',{
            branch_id: selected_branch.value,
            expired_list: expired_list.value
        })

        branches.value = res.data.branches
        stock_report.value = res.data.stock_report

        content_loading.value = false

        stock_report.value.forEach((value)=>{
            delete value.id
            selected_branch.value !== '' ? delete value.branch_name : null
            delete value.hospital_id
            delete value.branch_id
            delete value.deleted_at
            delete value.created_at
            delete value.updated_at
            delete value.purchased_voucher_id
        })
    }
    return { 
        selected_branch,
        edit_row,
        selected_row,
        current_section,
        current_tab,
        drug_stock_id,
        brand_name,
        generic_name,
        drug_form,
        drug_dosage,
        purchased_date,
        purchased_price,
        purchased_quantity,
        expiry_date,
        dispensed_amount,
        purchase_records,
        dispense_records,
        branches,
        drugs,
        stock_report,
        selected_drug,
        expired_list,
        initiate_pharmacy_create,
        initiate_purchase_records,
        initiate_pharmacy_dispense_create,
        initiate_dispense_records,
        initiate_pharmacy_inventory
    };
});
