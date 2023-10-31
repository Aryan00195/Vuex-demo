import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import VuexPersist from "vuex-persist";
import Swal from "sweetalert2";
// import { swal } from "vue/types/umd";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 100,
    img: "/static/productkeyboard.jpg",
    stock: 5,
  },
  {
    id: 2,
    name: "Mouse",
    price: 200,
    img: "/static/productmouse.jfif",
    stock: 8,
  },
];
let coupons = [
  {
    name: "falt20%off",
    type: "percentage",
    code: "1first",
    value: 20,
  },
  {
    name: "flatrs100",
    type: "fixed",
    code: "2festive",
    value: 100,
  },
];
const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    items: [],
    products,
    coupons,
    isLoggedIn: false,
  },
  getters: {
    getdiscount: (state) => state.discountAmount,
    getCoupons: (state) => state.coupons,
    getTotal: (state) => state.subtotal,
    getItems: (state) => state.items,
    checkLogin: (state) => state.isLoggedIn,
    getCartlength: (state) => state.items.length,
    cartData: (state) => state.items,
    GET_PRICE: (state) => {
      var amount = 0;
      const items = [...state.items];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        amount += item.quantity * item.price;
      }
      state.subtotal = amount;
      return amount;
    },
  },
  mutations: {
    ADD_ITEM: (state, payload) => {
      let product = products.filter((item) => item.id == payload.id);
      if (product.length) {
        product = product[0];
      }
      let itemIndex = -1;
      for (var i = 0; i < state.items.length; i++) {
        if (state.items[i].id == payload.id) {
          itemIndex = i;
          break;
        }
      }
      if (itemIndex == -1) {
        state.items.push(payload);
      } else {
        const item = JSON.parse(JSON.stringify(state.items[itemIndex]));
        if (product.stock < item.quantity + 1) {
          return Swal.fire({
            icon: "error",
            title: "Out of stock",
            text: "Available only " + product.stock + "products",
          });
        } else {
          item.quantity += payload.quantity;
          state.items.splice(itemIndex, 1);
          state.items.splice(itemIndex, 0, item);
          // state.items = [...state.items, item];
          //state.items[itemIndex]["quantity"] += payload.quantity;
          //  state.items.push(item);
          // console.log("added");
        }
      }
    },
    INC_QUANT: (state, payload) => {
      let i;
      i = state.items.indexOf(payload);
      const item = JSON.parse(JSON.stringify(state.items[i]));
      item.quantity += 1;
      state.items.splice(i, 1);
      state.items.splice(i, 0, item);
      state.discountAmount = 0;
    },
    DEC_QUANT: (state, payload) => {
      let i;
      i = state.items.indexOf(payload);
      const item = JSON.parse(JSON.stringify(state.items[i]));
      if (item.quantity == 1) return;
      item.quantity -= 1;
      state.items.splice(i, 1);
      state.items.splice(i, 0, item);
      state.discountAmount = 0;
    },
    REMOVE_ITEM: (state, payload) => {
      let itemIndex = state.items.indexOf(payload);
      state.items.splice(itemIndex, 1);
    },
    Set_Login: (state) => {
      state.isLoggedIn = true;
    },
    User_Logout: (state) => {
      state.isLoggedIn = false;
    },
    Apply_Discount: (state, payload) => {
      let coupon = coupons.filter((item) => item.code == payload);
      if (coupon.length) {
        coupon = coupon[0];
        if (coupon.type == "fixed") {
          state.discountAmount = coupon.value;
          state.subtotal = state.subtotal - state.discountAmount;
          Swal.fire(
            "Applied!",
            "Coupon code  " +
              coupon.code +
              " Applied  Rs " +
              coupon.value +
              " Discount ",
            "success"
          );
          return;
        } else {
          state.discountAmount = (coupon.value / 100) * state.subtotal;
          state.subtotal = state.subtotal - state.discountAmount;
          Swal.fire(
            "Applied!",
            "Coupon code  " +
              coupon.code +
              " Applied " +
              coupon.value +
              "%  Discount ",
            "success"
          );

          return;
        }
      } else {
        return Swal.fire("invalid coupon code");
      }
    },
    removeCoupon: (state) => {
      state.subtotal += state.discountAmount;
      state.discountAmount = 0;
    },
  },
  actions: {
    addToCart: function ({ commit }, payload) {
      commit("ADD_ITEM", payload);
    },
    INC_QUANT: function ({ commit }, payload) {
      commit("INC_QUANT", payload);
    },
    DEC_QUANT: function ({ commit }, payload) {
      commit("DEC_QUANT", payload);
    },
    remove: function ({ commit }, payload) {
      commit("REMOVE_ITEM", payload);
    },
    SetLogin: function ({ commit }, payload) {
      commit("Set_Login", payload);
    },
    Logout: function ({ commit }) {
      commit("User_Logout");
    },
    Discount: function ({ commit }, payload) {
      commit("Apply_Discount", payload);
    },
    removeCoupon: function ({ commit }, payload) {
      commit("removeCoupon", payload);
    },
  },
  modules: {
    user,
  },
});
export default store;
