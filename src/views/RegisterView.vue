<template>
<AuthLayout :class="'my-3'">
    <ImageCard :image_path="'/images/login_banner.png'" :image_description="'Hospital Logo'" />
    <FormCard :title="'STAFF REGISTER'" @submit="register">
        <AuthInput 
            :required_label="true" 
            :label="'Email:'" 
            :type="'email'"
            :placeholder="'name@example.com'"
            :error_message="invalid_email_msg"
            v-model:input_value="email"
            @clear_error="()=>{invalid_email_msg = ''}"
        />
        <AuthInput 
            :required_label="true" 
            :label="'Name:'" 
            :placeholder="'E.g. John Smith'"
            :error_message="invalid_name_msg"
            v-model:input_value="name"
            @clear_error="()=>{invalid_name_msg = ''}"
        />
        <div class="mb-3">
            <label class="form-label"><strong class="text-danger">*</strong>Rank</label>
            <SearchableList
                :select_id="'rank_selector'" 
                :array="ranks"
                :placeholder="'Select your staff rank'"
                :selected_val="rank"
                @select="select_rank"
            />
            <div class="mb-3" v-if="invalid_rank_msg">
                <span class="text-white badge bg-danger">{{ invalid_rank_msg }}</span>
            </div>
        </div>
        <div class="mb-3" v-if="branches.length !== 0">
            <label class="form-label" for="rank"><strong class="text-danger">*</strong>Branch</label>
            <SearchableList
                :select_id="'branch_selector'" 
                :array="branches"
                :placeholder="'Select your staff branch'"
                :selected_val="branch"
                :path="['name']"
                @select="select_branch"
            />
            <div class="mb-3" v-if="invalid_branch_msg">
                <span class="text-white badge bg-danger">{{ invalid_branch_msg }}</span>
            </div>
        </div>
        <AuthInput 
            :required_label="true" 
            :label="'Password:'" 
            :type="'password'"
            :placeholder="'Type your password here'"
            v-model:input_value="password"
            :error_message="invalid_password_msg"
            @clear_error="()=>{invalid_password_msg = ''}"
        />
        <AuthInput 
            :required_label="true" 
            :label="'Confirm Password:'"
            :type="'password'"
            :placeholder="'Type your password here'"
            v-model:input_value="password_confirmation"
            @clear_error="()=>{invalid_password_msg = ''}"
        />
        <AuthButtons
            :has_links="true"
            :link_one="'/login'"
            :link_one_description="`Already registered? Please sign in here.`"
            :button_name="'Register'"
        />
    </FormCard>
</AuthLayout>
</template>
<script setup>
import ImageCard from "../components/Auth/ImageCard.vue";
import AuthLayout from "../layouts/_layouts/AuthLayout.vue";
import { 
    useDataStore 
} from "../stores/data";
import { 
    useRegisterStore 
} from "../stores/register";
import { 
    storeToRefs 
} from "pinia";
import { 
    onMounted,
    ref 
 } from "vue";
import init from "../helpers/init";
import FormCard from "../components/Auth/FormCard.vue";
import AuthInput from "../components/_Global_/InputBox.vue";
import AuthButtons from "../components/Auth/AuthButtons.vue";

const ranks = [
    'admin',
    'accountant',
    'cashier',
    'doctor',
    'nurse',
    'pharmacist',
    'lab technician',
    'reception'
]
const branches = ref([]);
const store = useRegisterStore();
const data_store = useDataStore();
const { 
    email,
    name,
    rank,
    branch,
    password,
    password_confirmation,
    invalid_email_msg,
    invalid_name_msg,
    invalid_rank_msg,
    invalid_branch_msg,
    invalid_password_msg 
} = storeToRefs(store);
const { 
    register
} = store;
const { 
    content_loading,
    auth_user, 
} = storeToRefs(data_store);

const select_rank = val => {
    invalid_rank_msg.value = null
    rank.value = val
    $('#select_rank').dropdown('toggle') 
}

const select_branch = val => {
    invalid_branch_msg.value = null
    branch.value = val
    $('#select_branch').dropdown('toggle') 
}

onMounted(async ()=>{
    content_loading.value = true
    if(rank.value !== 'admin' && auth_user.value !== null) {
        const res = await init.sendDataToServer('branches','post')
        branches.value = res.data.branches
    }
    content_loading.value = false
})
</script>
