<template>
  <div>
    <h1>
      This a About Page
      {{ CheckLogin }}
    </h1>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: 'ViewValue',
  components: {
  },
  computed: {
    ...mapGetters({ FETCH_VALUE: "user/FETCH_VALUE", CheckLogin: 'checkLogin' })
  },
  methods: {

  },
}
</script>
