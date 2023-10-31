<template>
  <div>
    <h1>This is Home Page</h1>
    <!-- <product-list></product-list> -->
    <!-- COUNT:{{FETCH_VALUE}} 
  <h1>
    {{ cartlength }}
  </h1>
   || ITEMS:{{ cartlength }} 
  <br>
    <v-btn @click="increment">Increment</v-btn>
    <v-btn @click="decrement">Decrement</v-btn>
    <v-btn @click="viewCount">About</v-btn>
     -->
  </div>
</template>

<script>
// import ProductList from "./ProductList.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'HomeView',
  components: {

  },
  computed: {
    ...mapGetters({ FETCH_VALUE: "user/FETCH_VALUE", cartlength: "getCartlength" })
  },
  methods: {
    ...mapActions({ increment: "user/increment", decrement: "user/decrement", addToCart: "addToCart" }),
    viewCount() {
      const path = `/About/`;
      this.$router.push({ path: path });
    },
  }
}
</script>
