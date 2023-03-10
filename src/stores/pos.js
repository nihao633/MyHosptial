import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import init from "../helpers/init";
import { useDataStore } from './data';

export const usePosStore = defineStore('pos_variables',() => {
    const item_quantity = ref(0)
    const store = useDataStore()
    const generic_names = ref([])
    const drugs = ref([])
    const item_lists = ref([])
    const current_method = ref('ID')
    const current_category = ref('')
    const current_generic_name = ref('')
    const current_brand_name = ref('')
    const current_id = ref('')
    const quantity = ref(0)
    const total = ref(0)
    const discount = ref(0)
    const grand_total = ref(0)
    const customer_paid = ref('')
    const patients = ref([])
    const selected_patient = ref('Guest')
    const payment_type = ref('Cash');
    const clear_mode = ref('all');
    const not_found = ref(false)
    const searching = ref(false)

    const {
        content_loading
    } = storeToRefs(store)
    const select_method = val => {
        current_method.value = val
        current_category.value = ''
        current_generic_name.value = ''
        current_brand_name.value = ''
        current_id.value = ''
        quantity.value = 0
    }
    const select_category = async val => {
        current_category.value = val
        current_generic_name.value = ''
        current_brand_name.value = ''
        quantity.value = 0
        await initiate()
    }
    const select_generic_name = async val => {
        current_generic_name.value = val['Generic Name']
        current_brand_name.value = ''
        quantity.value = 0
        await initiate()
    }
    const select_brand_name = async val => {
        current_brand_name.value = val
        quantity.value = 0
    }

    const initiate = async (search_string = null) => {
        content_loading.value = false
        patients.value = []
        const res_patients = search_string !== null ? await init.sendDataToServer('patients?name=' + search_string) : await init.sendDataToServer('patients')
        patients.value = res_patients.data.patients

        if(search_string !== null) {
            searching.value = false
            if(patients.value.length == 0) not_found.value = true
            return;
        }

        drugs.value = []
        item_lists.value = []
        const res = await init.sendDataToServer('drugs')
        if (current_category.value !== '') {
            generic_names.value = []
            drugs.value = []
            res.data.drugs.forEach(drug => {
                if (drug['Drug Form'] == current_category.value) {
                    if(!drugs.value[drug['Generic Name']]) return drugs.value[drug['Generic Name']] = drug
                }
            });  
    
            for (const [key, value] of Object.entries(drugs.value)) {
                generic_names.value.push(value);
            }

            drugs.value = []
        }

        if (current_category.value !== '' && current_generic_name.value !== '') {
            drugs.value = []
            res.data.drugs.forEach(drug => {
                if (drug['Generic Name'] == current_generic_name.value) return drugs.value.push(drug)
            })    
        }
    }

    const addToCart = async () => {
        content_loading.value = true
        if(quantity.value == 0 || quantity.value == '') {
            content_loading.value = false
            return store.toggleAlert('Quantity cannot be 0 or empty.')
        }
        if(current_method.value == 'ID' && (typeof(current_id.value) == 'string' || current_id.value == 0 || current_id.value == '')) {
            content_loading.value = false
            return store.toggleAlert('ID cannot be string or empty.')
        }
        if(current_method.value == 'Name' && (typeof(current_name.value) == 'number' || current_name.value == '')) {
            content_loading.value = false
            return store.toggleAlert('Name cannot contain number or be empty.')
        }

        if (current_id.value !== '') {
            current_brand_name.value = ''
            drugs.value = []
            item_quantity.value = 0
            const res = await init.sendDataToServer('drugs')

            res.data.drugs.forEach(drug => {
                if (drug.id == current_id.value) return current_brand_name.value = drug
            })

            if (current_brand_name.value == '') {
                content_loading.value = false
                return store.toggleAlert('Item not found with this id number ' + current_id.value)
            }
        }

        item_lists.value.map(val=> val.drug.id).indexOf(current_brand_name.value.id) > -1 ? 
        item_quantity.value = 
        Number(quantity.value) + Number(item_lists.value[item_lists.value.map(val=> val.drug.id).indexOf(current_brand_name.value.id)].quantity) :
        item_quantity.value = quantity.value

        const res = await init.sendDataToServer('purchased_records/price','post',{
            drug_id: current_brand_name.value.id,
            quantity: item_quantity.value,
        })

        if(res.response) {
            content_loading.value = false
            if(res.response.data.status) return store.toggleAlert(res.response.data.status)
            if(res.response.data.errors) {
                Object.entries(res.response.data.errors).forEach(err => {
                    store.toggleAlert(err[1][0])
                })
            }
            return;
        }

        total.value += (quantity.value * res.data.resale_price)
        discount.value += res.data.discount
        grand_total.value += ((quantity.value * res.data.resale_price) - res.data.discount)

        content_loading.value = false

        if(item_lists.value.length == 0) {
            return item_lists.value.push({
                drug: current_brand_name.value, 
                customer: selected_patient.value !== 'Guest' ? selected_patient.value : null, 
                payment_type: payment_type.value, 
                item_name: `
                    ${current_brand_name.value['Brand Name']} 
                    (${current_brand_name.value['Generic Name']} 
                    ${current_brand_name.value['Drug Form']} ${current_brand_name.value['Drug Dosage']})
                `, 
                quantity: quantity.value, 
                unit_price: res.data.resale_price, 
                price: quantity.value * res.data.resale_price, 
                discount: res.data.discount, 
                selected_to_clear: false
            })
        }
        return item_lists.value.forEach(val => {
            if(val.drug.id === current_brand_name.value.id) {
                val.quantity = item_quantity.value
                val.price = item_quantity.value * val.unit_price
            }
        });
    }

    const clear = () => {
        clear_mode.value = 'all'
        selected_patient.value = 'Guest'
        payment_type.value = 'Cash'
        item_lists.value = []
        total.value = 0
        discount.value = 0
        grand_total.value = 0
    }

    const clear_cart = () => {
        if(clear_mode.value == 'all') return clear()
        item_lists.value.forEach((item,index) => {
            if(item.selected_to_clear) {
                total.value -= item.price
                discount.value -= item.discount
                grand_total.value -= (item.price - item.discount)
                return item_lists.value.splice(index,1)
            }
        });
        clear_mode.value = 'all'
    }    

    return {
        generic_names,
        drugs,
        item_lists,
        current_method,
        current_category,
        current_generic_name,
        current_brand_name,
        quantity,
        current_id,
        total,
        discount,
        grand_total,
        customer_paid,
        patients,
        selected_patient,
        payment_type,
        clear_mode,
        not_found,
        searching,
        select_method,
        select_category,
        select_generic_name,
        select_brand_name,
        initiate,
        addToCart,
        clear,
        clear_cart
    }
})