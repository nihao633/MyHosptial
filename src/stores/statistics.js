import Chart from 'chart.js/auto';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useDataStore } from '@/stores/data.js';
import init from '@/helpers/init.js';

export const useStatisticsStore = defineStore('statistics',()=>{
    const store = useDataStore()
    const {
        content_loading
    } = storeToRefs(store)
    const current_year = ref('');
    const current_report = ref('');
    const current_duration = ref('');
    const year_lists = ref([]);
    const display_type = ref('pie');
    const timer_id = ref(0);

    const generate_report = async () => {
        content_loading.value = true
        clearTimeout(timer_id.value)
        let container = document.getElementById('chart_container')
        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }    
        container.classList.add('d-none')

        const res = await init.sendDataToServer('generate/reports','post',{
            selected_year: current_year.value,
            selected_report_type: current_report.value,
            selected_report_duration: current_duration.value,
        })

        console.log(res);

        if(res.response) {
            Object.entries(res.response.data.errors).forEach((err)=>{
                store.toggleAlert(err[1][0])
            })

            content_loading.value = false
            return;
        }

        console.log(res);

        timer_id.value = setTimeout(()=>{
            let chart = document.createElement('canvas');
            chart.id = 'my_report';
            container.appendChild(chart);
    
            const ctx = document.getElementById('my_report');
    
            new Chart(ctx, {
                type: display_type.value,
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }); 
    
            container.classList.remove('d-none')
            content_loading.value = false    
        },2000)
        return ;   
    }

    return {
        current_year,
        current_report,
        current_duration,
        year_lists,
        display_type,
        generate_report
    }
});