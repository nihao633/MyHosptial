import { useDataStore } from "../stores/data";
import en from "@/locales/en.json";
import mm from "@/locales/mm.json";

const plugIns = {
    install(app, options) {
      app.config.globalProperties.$is_online = () => {
        return window.navigator.onLine
      }
      app.config.globalProperties.$translate = (key) => {
        const store = useDataStore()
        if(store.selected_locale == 'mm') {
          if(mm[key] == undefined) return key;
          return mm[key];
        } 

        if(en[key] == undefined) return key;
        return en[key];
      }
    }
  }

export default plugIns
