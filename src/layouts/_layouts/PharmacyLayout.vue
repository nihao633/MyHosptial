<template>
<h1>Pharmacy</h1>
<div class="container mx-auto my-3 h-100">
    <div class="mb-5 py-3 border border-3 row">
        <div class="col-12 mb-3 col-md-3 col-lg-2">
            <slot name="side_bar"/>
        </div>
        <div class="col col-md-9 col-lg-10">
            <div class="form-control shadow">
                <slot name="side_content" />
            </div>
        </div>
    </div>
</div>
</template>