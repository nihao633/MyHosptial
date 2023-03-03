import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import _searchable_list from '../src/components/_Global_/_searchable_list.vue'
import InputBox from '../src/components/_Global_/InputBox.vue';
import plugIns from './helpers/plugins.js'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(plugIns)
    .component('SearchableList', _searchable_list)
    .component('InputBox', InputBox)
    .mount('#app')

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:5173";
axios.defaults.headers.common["Accept"] = "application/json";
