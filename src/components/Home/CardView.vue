<template>
<div class="card ms-2 mt-2">
    <img :src="image_path" class="card-img-top p-2" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <RouterLink :to="link" class="btn btn-primary" :style="authorized ? '' : 'pointer-events: none; background: grey !important; border: grey 0 !important;'">{{ authorized ? $translate('click_here') : $translate('unauthorized')}}</RouterLink>
    </div>
</div>
</template>
<script setup>
defineProps(['title','description', 'unauthorized','link','image_path','authorized'])
</script>