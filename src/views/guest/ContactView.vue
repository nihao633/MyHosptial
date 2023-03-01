<template>
<div class="row align-items-center py-5 justify-content-center">
    <div class="col-12 col-md-10 col-lg-6 px-5 mb-3 mb-xl-0">
        <div class="row mb-4">
            <h1>Contact Info</h1>
            <p>
                You can reach out to me and my wife via the following contacts:
            </p>
        </div>
        <div class="row">
            <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                <h4>Mr. Han Win Aung</h4>
                <p><i class="fa-solid fa-location-dot"></i> No. 599, Marga 5 Street, 12 Quarter, South Okkalapa Township, Yangon</p>
                <p><i class="fa-solid fa-phone"></i> +95 9 779 807 807</p>
                <p><i class="fa-solid fa-envelope"></i> nihao633@gmail.com</p>
            </div>
            <div class="col mb-3 mb-xl-0">
                <h4>Mrs. Eaindra Kyaw</h4>
                <p><i class="fa-solid fa-location-dot"></i> No. 599, Marga 5 Street, 12 Quarter, South Okkalapa Township, Mandalay</p>
                <p><i class="fa-solid fa-phone"></i> +95 9 430 29 610</p>
                <p><i class="fa-solid fa-envelope"></i> eaindra.rose@gmail.com</p>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-10 col-lg-6 col-xl-4">
        <form class="form-control mx-0 mx-xl-5 shadow" @submit.prevent="send_email">
            <div class="p-3 p-md-5">
                <h6 class="text-secondary text-center mb-4 ">SEND US A MESSAGE</h6>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="name">
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="text" class="form-control" v-model="email">
                </div>
                <div class="mb-3">
                    <label class="form-label">Message</label>
                    <textarea class="form-control" rows="6" v-model="message" />
                </div>
                <button class="btn btn-primary w-100" type="submit">Send Message</button>
            </div>
        </form>
    </div>
</div>
</template>
<script setup>
import { 
    ref,
    onMounted 
} from 'vue';
import emailjs from '@emailjs/browser';
import { useDataStore } from '../../stores/data';

const store = useDataStore()
const email = ref('')
const name = ref('')
const message = ref('')

const reset = () => {
    email.value = ''
    name.value = ''
    message.value = ''
}

onMounted(()=>{
    reset()
})

const send_email = () => {
    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, { 
        to_name: 'Han Win Aung',
        reply_to: email.value,
        from_name: name.value,
        message: message.value,
    }, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
    .then(function(response) {
        store.toggleAlert('Thank you for contacting us. We will reply back to you as quickly as possible.',false,200)
        reset();
    }, function(error) {
        store.toggleAlert('Your email is incorrect. Please check and send it again',false)
    });
}
</script>
