<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Image</th>
            <th class="text-left">Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><img :src="item.img" width="50" /></td>
            <td>{{ item.price }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-btn :disabled="item.quantity == 1">
                <v-icon @click="decrement(item)">
                  mdi-minus
                </v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn :disabled="item.quantity == item.stock">
                <v-icon @click="increment(item)">
                  mdi-plus
                </v-icon>
              </v-btn>
            </td>
            <td v-if="item.quantity"><v-btn @click="remove_item(item)">Remove</v-btn></td>
          </tr>
          Sub Total:{{ getAmount }}<br>
          Discount:{{ discount }}<br>
          Total:{{ total }}
          <v-text-field label="Enter Coupon Code" v-model="value"></v-text-field><v-btn @click="apply(value)">Apply
            Coupon</v-btn>
          <v-btn @click="removeCoupon(value)">Remove</v-btn>
          <v-dialog max-width="600px" max-height="750px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">Show Available </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-app>
                <h1 style="float: left;"> </h1>
                <v-btn text @click="dialog.value = false" style="float: right;">Close</v-btn>
                <v-card>
                  <v-card-title class="text-h5"> Coupons </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-subheader>Select Coupons</v-subheader>
                      <v-list-item-group color="primary" v-model="value" v-if="!discount">
                        <v-list-item v-for="coupon in couponlist" :key="'Coupon_' + coupon.code" :value="coupon.code"
                          @click="dialog.value = false">
                          <v-list-item-content>
                            <v-list-item-title>{{ coupon.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                      <v-list-item-group color="primary" v-model="value" v-else>You can add only one
                        coupon</v-list-item-group>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-app>
            </template>
          </v-dialog>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => {
    return {
      value: [],
    }
  },
  computed: {
    ...mapGetters({ items: "cartData", getAmount: "GET_PRICE", couponlist: "getCoupons", total: 'getTotal', discount: 'getdiscount' }),
  },
  methods: {
    ...mapActions({ Remove: "remove", decrement: "DEC_QUANT", increment: "INC_QUANT", applyDiscount: 'Discount', removeCoupon: 'removeCoupon' }),
    apply(value) {
      this.applyDiscount(value);
    },
    remove_item(item) {
      Swal.fire({
        title: 'Do you want to remove item from cart?',
        showDenyButton: true,
        confirmButtonText: 'Remove',
        denyButtonText: `cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Removed!', '', 'success')
          this.Remove(item);
        }
      })
    },
  },
};
</script>
