<template>
    <div :class="class">
        <label class="form-label" for="rank"><strong class="text-danger">*</strong>Consultant's Name:</label>
        <SearchableList
            :array="consultants"
            :path="['name']"
            :placeholder="'Choose your consultant'"
            :selected_val="consultant"
            @select="$emit('select',consultant)"
        />
    </div>
    <div class="mb-3" v-if="invalid_consultant_name_msg">
        <span class="text-white badge bg-danger">{{ invalid_consultant_name_msg }}</span>
    </div>
</template>

<script setup>
import { 
    storeToRefs 
} from 'pinia';
import { 
    usePosStore 
} from '../../../stores/pos';
import { 
    useReceptionStore 
} from '../../../stores/reception';
import { 
    onMounted,
    ref 
} from 'vue';
import init from '../../../helpers/init';

defineProps([
    'class'
])
defineEmits([
    'select'
])
const consultants = ref([])
const pos_store = usePosStore();
const store = useReceptionStore();
const {
    searching
} = storeToRefs(pos_store)
const {
    consultant,
    invalid_consultant_name_msg
} = storeToRefs(store)
onMounted(async () => {
    const res = await init.sendDataToServer('consultants')
    
    consultants.value = res.data.consultants
    if(consultants.value.length == 0) searching.value = null
})

</script>