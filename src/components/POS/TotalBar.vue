<template>
<div class="row mx-0 px-3 text-end">
    <p class="col-8">
        <strong>
            {{ item_one_name }}
        </strong>
    </p>
    <p class="col text-end">
        <strong>
            {{ item_one }} MMK
        </strong>
    </p>
</div>
<div class="row mx-0 px-3 text-end">
    <p class="col-8">
        <strong>
            {{ item_two_name }}
        </strong>
    </p>
    <p class="col text-end">
        <strong>
            {{ item_two }} MMK
        </strong>
    </p>
</div>
<hr>
<div class="row mx-0 px-3 text-end" v-if="item_three">
    <p class="col-8">
        <strong>
            {{ item_three_name }}
        </strong>
    </p>
    <p class="col text-end">
        <strong>
            {{ item_three }} MMK
        </strong>
    </p>
</div>
</template>

<script setup>
defineProps(['item_one','item_one_name', 'item_two','item_two_name', 'item_three', 'item_three_name'])
</script>
