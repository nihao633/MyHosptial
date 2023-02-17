<template>
<div class="container my-5">
    <div class="row d-block d-lg-flex shadow">
        <div class="col-12 col-lg-6 border px-0">
            <slot name="content_one"/>
        </div>
        <div class="col border px-0 position-relative">
            <slot name="content_two" />
        </div>
    </div>
</div>
</template>
