<template>
  <v-app>
    <nav>
      <v-btn color="grey" class="mr-5">
        <v-icon>
          mdi-account
        </v-icon>
        <router-link to="/">Home</router-link>
      </v-btn>
      <v-btn color="grey" class="mr-5">
        <router-link to="/products">Products</router-link>
      </v-btn>
      <v-btn color="grey" class="mr-5" v-if="CheckLogin">
        <router-link to="/about">About</router-link>
      </v-btn>
      <v-btn color="grey" class="mr-5" v-if="0">
        <router-link to="/register">Register</router-link>
      </v-btn>
      <v-btn color="grey" class="mr-5" v-if="!CheckLogin">
        <router-link to="/login">Login</router-link>
      </v-btn>
      <v-btn color="grey" class="mr-5">
        <router-link to="/cart"><v-icon color="black">mdi-cart</v-icon>Cart {{ cartLength }}</router-link>
      </v-btn>
      <v-btn color="grey" @click='logout' v-if="CheckLogin">Logout</v-btn>
    </nav>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({ cartLength: 'getCartlength', CheckLogin: 'checkLogin' })
  }, methods: {
    ...mapActions({ logoutUser: 'Logout' }),
    logout() {
      this.logoutUser();
      this.$router.push({ path: `/` })
    },
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202a38;
}

nav {
  padding: 30px;
  background-color: rgb(38, 48, 66);
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  a {
    font-weight: bold;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

}
</style>

