<template>
<PosLayout>
    <template #content_one>
        <HeaderThree :title="'POS'" :string="init.current_time.value" />
        <ProductSelector />
    </template>
    <template #content_two>
        <HeaderThree :class="'mb-3'" :title="'Cashier'" :string="data_store.auth_user.name" />
        <HeaderSix :title="'Customer'" :string="typeof(selected_patient) == 'object' ? selected_patient.name : selected_patient" />
        <HeaderSix :title="'Payment Type'" :string="payment_type" />
        <hr>
        <div class="overflow-auto" style="height: 18vh;">
            <p class="text-center py-4"  v-if="item_lists.length == 0 && !data_store.content_loading"><em><strong>Added items will be displayed here.</strong></em></p>
            <p class="text-center py-4 text-danger"  v-if="data_store.content_loading"><em><strong>Adding items...<br>Please wait...</strong></em></p>
            <ProductView v-if="!data_store.content_loading && item_lists.length !== 0" v-for="(item,key) in  item_lists" :item_key="key" :price="item.price" :unit_price="item.unit_price" :item_name="item.item_name" :quantity="item.quantity" />
        </div>
        <hr v-if="item_lists.length !== 0">
        <TotalBar :item_one="total" :item_one_name="'Total:'" :item_two_name="'Discount:'" :item_two="discount" :item_three_name="'Grand Total:'" :item_three="grand_total" v-if="item_lists.length !== 0"/>
        <div class="row mx-0" style="width: 100%;" v-if="item_lists.length !== 0">
            <PosButtons :button_one="'Customer'" :button_two="'Print Receipt'" @clicked_one="show_select_patient" @clicked_two="show_print_receipt"/>
            <PosButtons :button_one="'Payment'" :button_two="'Clear'" @clicked_two="show_clear" @clicked_one="show_select_payment" />
        </div>
    </template>
</PosLayout>
<div id="clear_cart" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Clear Cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-check">
                    <input class="form-check-input" type="radio" v-model="clear_mode" :value="'all'">
                    <label class="form-check-label">
                        All Items
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" v-model="clear_mode" :value="'selected_only'">
                    <label class="form-check-label">
                        Only Selected Items:
                    </label>
                </div>
                <div v-for="item in item_lists" class="form-check" v-if="clear_mode == 'selected_only'">
                    <input class="form-check-input" type="checkbox" v-model="item.selected_to_clear">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ item.item_name }}
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="clear_cart" data-bs-dismiss="modal">Clear</button>
            </div>
        </div>
    </div>
</div>
<div id="select_payment" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Payment Type</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <SearchableList :array="['Cash','K-Pay']" :selected_val="payment_type" @select="select_payment"/>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div id="select_patient" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Choose Customer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <SearchableList :searchable="true" @select="select_customer" :selected_val="selected_patient" @search="search_customers" :array="['Guest', ...patients]" :path="['name']" :placeholder="'Choose Customers'"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="print_receipt" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form class="modal-content" @submit.prevent="save_print_receipt()">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Print Receipt</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="input-group mb-3">
            <span class="input-group-text">Total Cost</span>
            <input type="text" class="form-control" :value="grand_total" disabled>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Paid</span>
            <input id="paid_input" type="text" class="form-control" placeholder="Enter the paid amount here" v-model="customer_paid" autocomplete="off">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Change</span>
            <input type="text" class="form-control" :value="customer_paid == 0 ? 0 : customer_paid - grand_total" disabled>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Print</button>
      </div>
    </form>
  </div>
  <div id="voucher" class="d-none">
    <div class="px-3">
        <h1 class="text-center"><i class="fa-solid fa-book-medical"></i> {{ data_store.auth_user ? data_store.auth_user.setting.hospital_name : 'My Hospital EMRS' }}</h1>
        <div>
            <p class="text-left"><span><i class="fa-solid fa-location-dot"></i> No. 675/B, Marga Street, 12 Quarter, South Okkalapa Township, Yangon, Myanmar <i class="fa-solid fa-phone"></i>+95 9 779 807 807 <i class="fa-solid fa-envelope"></i> nihao633@gmail.com</span></p>
        </div>
    </div>
    <hr>
    <h3 class="text-center py-2">Purchase Receipt</h3>
    <ProductView :item_key="'No.'" :price="'Price'" :unit_price="''" :item_name="'Name'" :quantity="''" />
    <ProductView v-for="(item,key) in  item_lists" :item_key="key" :price="item.price" :unit_price="item.unit_price" :item_name="item.item_name" :quantity="item.quantity" />
    <div class="position-absolute bottom-0 mx-0 px-0 w-100">
        <hr>
        <TotalBar :item_one="total" :item_one_name="'Total:'" :item_two_name="'Discount:'" :item_two="discount" :item_three_name="'Grand Total:'" :item_three="grand_total"/>
        <TotalBar :item_one="customer_paid" :item_one_name="'Paid:'" :item_two_name="'Change:'" :item_two="customer_paid - grand_total"/>
        <p class="text-center text-secondary"><em><small>Your satisfaction is our service.</small></em></p>
    </div>
</div>
</div>
</template>

<script setup>
import SearchableList from '../components/_searchable_list.vue';
import PosButtons from '../components/POS/PosButtons.vue';
import HeaderSix from '../components/POS/HeaderSix.vue';
import HeaderThree from '../components/POS/HeaderThree.vue';
import PosLayout from '../layouts/_layouts/PosLayout.vue';
import ProductSelector from '../components/POS/ProductSelector.vue';
import ProductView from '../components/POS/ProductView.vue';
import init from '../helpers/init';
import {
    useDataStore
} from '../stores/data';
import TotalBar from '../components/POS/TotalBar.vue';
import {
    usePosStore
} from '../stores/pos';
import {
    storeToRefs
} from 'pinia';
import { onMounted } from 'vue';

const store = usePosStore();
const {
    item_lists,
    total,
    discount,
    grand_total,
    customer_paid,
    patients,
    selected_patient,
    payment_type,
    clear_mode,
} = storeToRefs(store);
const {
    clear_cart,
    initiate,
    clear
} = store;
const data_store = useDataStore();

onMounted(()=>{
    const paid_input = document.getElementById('paid_input')
    $('#print_receipt').on('shown.bs.modal',()=>{
        paid_input.focus()
    })
    $('#print_receipt').on('hide.bs.modal',()=>{
        customer_paid.value = ''
    })
})
const show_clear = () => $('#clear_cart').modal('show')
const show_select_patient = () => $('#select_patient').modal('show')
const show_select_payment = () => $('#select_payment').modal('show')
const search_customers = (val) => initiate(val)

const select_customer = val => {
    selected_patient.value = val
    item_lists.value.forEach(item => {
        item.customer = val
    });
}
const select_payment = val => {
    payment_type.value = val
    item_lists.value.forEach(item => {
        item.payment_type = val
    });
}
const show_print_receipt = () => $('#print_receipt').modal('show');
const save_print_receipt = async () => {
    if(customer_paid.value == '' || customer_paid.value == 0) {
        paid_input.focus()
        return data_store.toggleAlert('Please enter the paid amount to continue.')
    }
    
    if(customer_paid.value < grand_total.value) 
        return data_store.toggleAlert('The amount paid is insufficient.')
    // const res = await init.sendDataToServer('save_receipt','post',{
    //     array: item_lists.value,
    //     transaction: {
    //         total: total.value,
    //         discount: discount.value,
    //         grand_total: grand_total.value,
    //         paid: customer_paid.value,
    //         change: customer_paid.value - grand_total.value,
    //     }
    // })

    var voucher = document.getElementById("voucher").innerHTML;
    document.body.innerHTML = voucher;
    window.print();
    history.go();
    alert('You can access to this page later in the sale records page.');
}
</script>
<style scoped>
.form-check-input:checked{
    background-color: #1d92cf;
    border-color: #1d92cf;
}
</style>
