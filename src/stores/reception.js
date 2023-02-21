import { defineStore } from "pinia";
import { ref } from "vue";
import init from "../helpers/init";
import { useDataStore } from "./data";

export const useReceptionStore = defineStore('reception_variables',()=>{        
    const store = useDataStore()
    const current_tab = ref(0)
    const date_of_visit = ref('')
    const visit_type = ref('')
    const name = ref('')
    const age = ref('')
    const sex = ref('')
    const father_name = ref('')
    const address = ref('')
    const phone_number = ref('')
    const consultant = ref('')
    const invalid_date_of_visit_msg = ref('')
    const invalid_visit_type_msg = ref('')
    const invalid_name_msg = ref('')
    const invalid_age_msg = ref('')
    const invalid_sex_msg = ref('')
    const invalid_father_name_msg = ref('')
    const invalid_address_msg = ref('')
    const invalid_phone_number_msg = ref('')
    const invalid_consultant_name_msg = ref('')

    const reset = () => {
        date_of_visit.value = ''
        visit_type.value = ''
        name.value = ''
        age.value = ''
        sex.value = ''
        father_name.value = ''
        address.value = ''
        phone_number.value = ''
        consultant.value = ''
        invalid_date_of_visit_msg.value = ''
        invalid_visit_type_msg.value = ''
        invalid_name_msg.value = ''
        invalid_age_msg.value = ''
        invalid_sex_msg.value = ''
        invalid_father_name_msg.value = ''
        invalid_address_msg.value = ''
        invalid_phone_number_msg.value = ''
        invalid_consultant_name_msg.value = ''
    }
    
    const print_record = () => {
        var print_patient = document.getElementById("print_register").innerHTML;
        var a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<body >');
        a.document.write(print_patient);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }

    const register_patient = async () => {
        const res = await init.sendDataToServer('patients/create','post',{
            date_of_visit: date_of_visit.value.trim(),
            visit_type: visit_type.value.trim(),
            name: name.value.trim(),
            age: age.value.trim(),
            sex: sex.value.trim(),
            father_name: father_name.value.trim(),
            address: address.value.trim(),
            phone_number: phone_number.value.trim(),
            consultant_name: consultant.value ? consultant.value.name.trim() : '',
            invalid_date_of_visit_msg: invalid_date_of_visit_msg.value,
            invalid_name_msg: invalid_name_msg.value,
            invalid_age_msg: invalid_age_msg.value,
            invalid_father_name_msg: invalid_father_name_msg.value,
            invalid_address_msg: invalid_address_msg.value,
            invalid_phone_number_msg: invalid_phone_number_msg.value,
            invalid_consultant_name_msg: invalid_consultant_name_msg.value,
        })

        // registeration failed
        if (res.data?.error == "duplicate entry") return store.toggleAlert('Patient already exists with the same father\'s name')
        if (res.message == "Request failed with status code 500") return store.toggleAlert('Unknown Error!!!') 
        if (res.response?.data.errors) {
            const errors = res.response.data.errors

            Object.keys(errors).forEach(key => {
                if (key == 'consultant_name') {
                    invalid_consultant_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'date_of_visit') {
                    invalid_date_of_visit_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'visit_type') {
                    invalid_visit_type_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'name') {
                    invalid_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'age') {
                    invalid_age_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'sex') {
                    invalid_sex_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'father_name') {
                    invalid_father_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'address') {
                    invalid_address_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'phone_number') {
                    invalid_phone_number_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
            });

            return;
        }

        // register success
        store.toggleAlert(`Patient ${name.value} is successfully registered.`,false,200)
        reset()
        return
    }

    const register_appointment = async () => {
        const res = await init.sendDataToServer('patients/appointment','post',{
            date_of_visit: date_of_visit.value.trim(),
            name: name.value.trim(),
            age: age.value.trim(),
            sex: sex.value.trim(),
            address: address.value.trim(),
            phone_number: phone_number.value.trim(),
            consultant_name: consultant.value ? consultant.value.name.trim() : '',
            invalid_date_of_visit_msg: invalid_date_of_visit_msg.value,
            invalid_name_msg: invalid_name_msg.value,
            invalid_age_msg: invalid_age_msg.value,
            invalid_address_msg: invalid_address_msg.value,
            invalid_phone_number_msg: invalid_phone_number_msg.value,
            invalid_consultant_name_msg: invalid_consultant_name_msg.value,
        })

        // registeration failed
        if (res.data?.error == "duplicate entry") return store.toggleAlert('Patient already exists with the same father\'s name')
        if (res.message == "Request failed with status code 500") return store.toggleAlert('Unknown Error!!!') 
        if (res.response?.data.errors) {
            const errors = res.response.data.errors

            Object.keys(errors).forEach(key => {
                if (key == 'consultant_name') {
                    invalid_consultant_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'date_of_visit') {
                    invalid_date_of_visit_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'name') {
                    invalid_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'age') {
                    invalid_age_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'sex') {
                    invalid_sex_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'address') {
                    invalid_address_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'phone_number') {
                    invalid_phone_number_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
            });

            return;
        }

        // register success
        store.toggleAlert(`Appointment for ${name.value} is successfully saved.`,false,200)
        reset()
        return
    }

    const update_appointment = async (appointment) => {
        const res = await init.sendDataToServer('patients/appointment/edit','post',{
            appointment_id: appointment.id,
            name: name.value.trim(),
            age: (typeof(age.value) == 'number') ? age.value : age.value.trim() ,
            sex: sex.value.trim(),
            address: address.value.trim(),
            phone_number: phone_number.value.trim(),
            consultant_name: consultant.value.trim(),
            invalid_name_msg: invalid_name_msg.value,
            invalid_age_msg: invalid_age_msg.value,
            invalid_address_msg: invalid_address_msg.value,
            invalid_phone_number_msg: invalid_phone_number_msg.value,
            invalid_consultant_name_msg: invalid_consultant_name_msg.value,
        })

        // registeration failed
        if (res.message == "Request failed with status code 500") return store.toggleAlert('Unknown Error!!!') 
        if (res.response?.data.errors) {
            const errors = res.response.data.errors

            Object.keys(errors).forEach(key => {
                if (key == 'consultant_name') {
                    invalid_consultant_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'name') {
                    invalid_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'age') {
                    invalid_age_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'sex') {
                    invalid_sex_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'address') {
                    invalid_address_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'phone_number') {
                    invalid_phone_number_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
            });
        }
        // update success
        store.toggleAlert(`Appointment for ${name.value} is successfully updated.`,false,200)
        $('#patient_dialog').modal('hide');
        $('#find_dialog').modal('show');
        reset()
        return        
    }

    const update_patient = async (patient) => {
        const res = await init.sendDataToServer('patient/edit','post',{
            patient_id: patient.id,
            name: name.value.trim(),
            age: (typeof(age.value) == 'number') ? age.value : age.value.trim() ,
            sex: sex.value.trim(),
            father_name: father_name.value.trim(),
            address: address.value.trim(),
            phone_number: phone_number.value.trim(),
            invalid_name_msg: invalid_name_msg.value,
            invalid_age_msg: invalid_age_msg.value,
            invalid_father_name_msg: invalid_father_name_msg.value,
            invalid_address_msg: invalid_address_msg.value,
            invalid_phone_number_msg: invalid_phone_number_msg.value,
            invalid_consultant_name_msg: invalid_consultant_name_msg.value,
        })

        // update failed
        if (res.message == "Request failed with status code 500") return store.toggleAlert('Unknown Error!!!') 
        if (res.response?.data.errors) {
            const errors = res.response.data.errors

            Object.keys(errors).forEach(key => {        
                if (key == 'name') {
                    invalid_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
        
                if (key == 'age') {
                    invalid_age_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'sex') {
                    invalid_sex_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'father_name') {
                    invalid_father_name_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'address') {
                    invalid_address_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }

                if (key == 'phone_number') {
                    invalid_phone_number_msg.value =errors[key][0];
                    return store.toggleAlert(errors[key][0]); 
                }
            });

            return;
        }

        // update success
        store.toggleAlert(`Patient ${name.value} is successfully updated.`,false,200)
        $('#patient_dialog').modal('hide');
        $('#find_dialog').modal('show');
        reset()
        return
    }

    const delete_patient = async (patient) => {
        const res = await init.sendDataToServer('patient/delete','delete',{
            patient_id: patient.id,
        })

        store.toggleAlert(`Patient ${name.value} is successfully deleted.`,false,200)
        $('#confirm_dialog').modal('hide');
        $('#find_dialog').modal('show');
        reset()
        return

    }

    const delete_appointment = async (appointment) => {
        const res = await init.sendDataToServer('patients/appointment/delete','delete',{
            appointment_id: appointment.id,
        })

        store.toggleAlert(`Appointment for ${name.value} is successfully deleted.`,false,200)
        $('#confirm_dialog').modal('hide');
        $('#find_dialog').modal('show');
        reset()
        return

    }
    
    return {
        current_tab,
        date_of_visit,
        visit_type,
        name,
        age,
        sex,
        father_name,
        address,
        phone_number,
        consultant,
        invalid_date_of_visit_msg,
        invalid_visit_type_msg,
        invalid_name_msg,
        invalid_age_msg,
        invalid_sex_msg,
        invalid_father_name_msg,
        invalid_address_msg,
        invalid_phone_number_msg,
        invalid_consultant_name_msg,    
        register_patient,
        reset,
        register_appointment,
        update_patient,
        update_appointment,
        print_record,
        delete_patient,
        delete_appointment,
    }
})
