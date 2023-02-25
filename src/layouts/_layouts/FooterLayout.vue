<template>
<div class="custom-bg text-white p-2 fixed-bottom d-flex shadow">
    <div class="mx-auto text-center">
        <span class="d-block d-sm-inline">© {{ auth_user ? auth_user.setting.hospital_name : 'My Hospital EMRS' }} {{ new Date().getFullYear() }}</span>
        <RouterLink class="ms-3 text-white" to="/contact">Contacts</RouterLink>
        <RouterLink class="ms-3 text-white" to="/about">About</RouterLink>
    </div>
</div>
</template>
<script setup>
defineProps(['auth_user'])
</script>
