import { defineStore } from "pinia";
import { ref } from "vue";
import init from "../helpers/init";
import { useDataStore } from "./data";

export const useOpdStore = defineStore('opd_variables',()=>{        
    const store = useDataStore()
    const current_tab = ref(0)
    const date_of_visit = ref('')
    const consultant = ref('')
    const history = ref('')
    const physical_examination = ref('')
    const investigation = ref('')
    const treatment = ref('')
    const diagnosis = ref('')
    const next_appointment = ref('')
    const selected_medicord = ref('')

    const reset = () => {
        date_of_visit.value = ''
        consultant.value = ''
        history.value = ''
        physical_examination.value = ''
        investigation.value = ''
        treatment.value = ''
        diagnosis.value = ''
        next_appointment.value = ''
        selected_medicord.value = ''
    }
    
    // const print_record = () => {
    //     var print_patient = document.getElementById("print_register").innerHTML;
    //     var a = window.open('', '', 'height=500, width=500');
    //     a.document.write('<html>');
    //     a.document.write('<body >');
    //     a.document.write(print_patient);
    //     a.document.write('</body></html>');
    //     a.document.close();
    //     a.print();
    // }

    const create_medicord = async () => {
        const res = await init.sendDataToServer('medicords/create','post',{
            medicord_id: selected_medicord.value.id,
            history: history.value,
            physical_examination: physical_examination.value,
            investigation: investigation.value,
            treatment: treatment.value,
            diagnosis: diagnosis.value,
            next_appointment: next_appointment.value
        })

        console.log(res);
        // registeration failed
        if (res.message == "Request failed with status code 500") return store.toggleAlert('Unknown Error!!!') 

        // register success
        store.toggleAlert(`Medical Record (ID: ${selected_medicord.value.id}) for patient named ${selected_medicord.value.patient.name} is successfully saved.`,false,200)
        reset()
        return
    }

    const update_medicord = async () => {
        console.log(selected_medicord.value);
        const res = await init.sendDataToServer('medicords/update','post',{
            patient_id: selected_medicord.value.patient.id,
            medicord_id: selected_medicord.value.id,
            history: history.value,
            physical_examination: physical_examination.value,
            investigation: investigation.value,
            treatment: treatment.value,
            diagnosis: diagnosis.value,
            next_appointment: next_appointment.value
        })

        console.log(res);
        // update failed
        if (res.message == "Request failed with status code 500") {
            store.toggleAlert('Unknown Error!!!')
            return false;
        }
        if (res?.response?.data?.message) {
            store.toggleAlert(res.response.data.message)
            return false
        }

        // update success
        store.toggleAlert(`Medical Record (ID: ${selected_medicord.value.id}) for patient named ${selected_medicord.value.patient.name} is successfully updated.`,false,200)
        reset()
        return true
    }
    
    return {
        current_tab,
        date_of_visit,
        consultant,
        history,
        physical_examination,
        investigation,
        treatment,
        diagnosis,
        next_appointment,
        selected_medicord,   
        reset,
        create_medicord,
        update_medicord,
        // print_record, will implement later
    }
})
