<template>
<MainLayout>
    <RouterView name="sub_layout" />
    <RouterView />

    <PharmacyLayout v-if="$router.currentRoute.value.name.split('_')[0] == 'pharmacy'">
        <template #side_bar>
            <RouterView name="pharmacy_side_bar" />
        </template>
        <template #side_content>
            <RouterView name="pharmacy_side_content" />
        </template>
    </PharmacyLayout>
</MainLayout>
<AlertMessage class="top_most_alert" />
</template>

<script setup>
import init from "./helpers/init";
import {
    onMounted
} from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import {
    RouterView
} from "vue-router";
import AlertMessage from "./components/_Global_/AlertMessage.vue";
import PharmacyLayout from "./layouts/_layouts/PharmacyLayout.vue";

onMounted(async () => {
    await init.sendDataToServer('sanctum/csrf-cookie')
    init.setCurrentTimeTimer()
})
</script>

<style scoped>
.top_most_alert {
    z-index: 9999 !important;
}
</style>
