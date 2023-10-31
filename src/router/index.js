import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductList from "../views/ProductList.vue";
import Login from "../views/LoginVue.vue";
// import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductList,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // const isLoggedIn = router.app.$store.getters.checkLogin ?? "0";
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // console.log(router.app.$store.state);
    const isLoggedIn =
      router.app.$store &&
      router.app.$store.state &&
      router.app.$store.state.isLoggedIn
        ? router.app.$store.state.isLoggedIn
        : false;
    if (!isLoggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    const isLoggedIn =
      router.app.$store &&
      router.app.$store.state &&
      router.app.$store.state.isLoggedIn
        ? router.app.$store.state.isLoggedIn
        : false;
    if (isLoggedIn) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
