<template>
    <div class="modal fade" :id="chart_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" >
        <div class="modal-dialog" >
            <div class="modal-content" style="background: transparent; border: 0;">
                <div class="modal-header">
                    <h1 class="modal-title text-white">{{ title }}</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <ExportView />
                <div class="modal-body bg-white d-none" id="chart_container">
                </div>
                <div class="text-white" v-if="store.content_loading">
                    Loading...
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import ExportView from '@/components/pharmacy/ExportView.vue';
import { useDataStore } from '../../stores/data';

const store = useDataStore()

defineProps(['chart_id','title'])
</script>