<template>
  <v-app>
    <v-row>
      <v-col v-for="item in items" :key="item.id">
        <template>
          <v-card class="mx-auto" max-width="400">
            <v-card-title>
              <v-img :src="item.img" width="400" height="200" />
              <h2 class="text-h5">
                {{ item.name }}
              </h2>
              <v-spacer></v-spacer>
              <span class="text-h6">₹{{ item.price }}</span>
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-dialog max-width="600px" max-height="750px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">View</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <h1 style="float: left;"> {{ item.name }} </h1>
                  <v-btn text @click="dialog.value = false" style="float: right;">Close</v-btn>

                  <v-card-text>
                    <h2>PRICE: {{ item.price }}</h2><br>
                    <img :src="item.img" alt="Image" width="300" height="200" /><v-rating v-model="rating" hover
                      color="yellow"></v-rating><br>
                    <hr>

                    <v-btn style="background-color: rgb(129, 243, 129);float: left;" @click="addItem(item)" block>Add
                      To Cart</v-btn>
                  </v-card-text>

                </v-card>
              </template>
            </v-dialog>
            <v-btn @click="addItem(item)" class="white--text" color="deep-purple accent-4">
              Add to Cart
            </v-btn>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      rating: 4,
      dialog: false,
      items: [
        {
          id: 1,
          name: "Keyboard",
          price: 100,
          stock: 5,
          img: "/static/productkeyboard.jpg",
        },
        {
          id: 2,
          name: "Mouse",
          price: 200,
          stock: 8,
          img: "/static/productmouse.jfif",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({ cartlength: "getCartlength", checkLogin: "checkLogin" })
  },
  methods: {
    ...mapActions({ addToCart: "addToCart", calAmount: "GET_PRICE" }),
    ViewCart() {
      const path = `/cart/`;
      this.$router.push({ path: path });
    },
    addItem(item) {
      if (this.checkLogin) {
        Swal.fire({
          icon: "success",
          title: "Adedd Successfully",
        });
        item.quantity = 1;
        this.addToCart(item);
      }
      else {
        this.$router.push({ path: `/login` });
      }
    },
  },
};
</script>
