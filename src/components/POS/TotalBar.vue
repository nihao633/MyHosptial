<template>
<div class="row mx-0 px-3 text-end">
    <p class="col-8">
        <strong>
            Total:
        </strong>
    </p>
    <p class="col text-end">
        <strong>
            {{ total }} MMK
        </strong>
    </p>
</div>
<div class="row mx-0 px-3 text-end">
    <p class="col-8">
        <strong>
            Discount:
        </strong>
    </p>
    <p class="col text-end">
        <strong>
            {{ discount }} MMK
        </strong>
    </p>
</div>
<hr>
<div class="row mx-0 px-3 text-end">
    <p class="col-8">
        <strong>
            Grand Total:
        </strong>
    </p>
    <p class="col text-end">
        <strong>
            {{ grand_total }} MMK
        </strong>
    </p>
</div>
</template>

<script setup>
defineProps(['total', 'discount', 'grand_total'])
</script>
