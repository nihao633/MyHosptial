<template>
<PosLayout>
    <template #content_one>
        <HeaderThree :title="'POS'" :string="init.current_time.value" />
        <ProductSelector />
    </template>
    <template #content_two>
        <HeaderThree :class="'mb-3'" :title="'Cashier'" :string="data_store.auth_user.name" />
        <HeaderSix :title="'Customer'" :string="selected_patient" />
        <HeaderSix :title="'Payment Type'" :string="payment_type" />
        <hr>
        <div class="overflow-auto" style="height: 18vh;">
            <p class="text-center py-4"  v-if="item_lists.length == 0"><em><strong>Added items will be displayed here.</strong></em></p>
            <ProductView v-for="item in  item_lists" :price="item.price" :unit_price="item.unit_price" :item_name="item.item_name" :quantity="item.quantity" />
        </div>
        <hr v-if="item_lists.length !== 0">
        <TotalBar :total="total" :discount="discount" :grand_total="grand_total" v-if="item_lists.length !== 0"/>
        <div class="row mx-0" style="width: 100%;" v-if="item_lists.length !== 0">
            <PosButtons :button_one="'Customer'" :button_two="'Print Receipt'" @clicked_one="show_select_patient" />
            <PosButtons :button_one="'Payment'" :button_two="'Clear'" @clicked_two="show_clear" @clicked_one="select_payment" />
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
        <div class="form-floating">
            <select v-model="payment_type" class="form-select">
                <option selected disabled>Payment Types:</option>
                <option value="Cash">Cash</option>
                <option value="K-Pay">K-Pay</option>
            </select>
            <label>Choose Payment Type</label>
        </div>
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
        <div class="form-floating">
            <select v-model="selected_patient" class="form-select">
                <option selected disabled>Customers:</option>
                <option value="Guest">Guest</option>
                <option :value="patient.name" v-for="patient in patients">{{patient.name}}</option>
            </select>
            <label>Choose Customer</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
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

const store = usePosStore();
const {
    item_lists,
    total,
    discount,
    grand_total,
    patients,
    selected_patient,
    payment_type,
    clear_mode
} = storeToRefs(store);
const {
    clear_cart
} = store;
const data_store = useDataStore();

const show_clear = () => $('#clear_cart').modal('show')
const show_select_patient = () => $('#select_patient').modal('show')
const select_payment = () => $('#select_payment').modal('show')

</script>
