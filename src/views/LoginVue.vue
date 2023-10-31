<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="formField.email" :rules="rule.EmailRules" label="E-mail" required></v-text-field>

      <v-text-field v-model="formField.password" :rules="rule.PasswordRules" label="Password" required></v-text-field>
      <v-btn @click="submit">
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template> 
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: false,
    formField: {
      name: '',
      email: '',
      password: '',
    },
    rule: {
      NameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      EmailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      PasswordRules: [
        v => !!v || 'Password is required',
        // v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v) || 'Enter a valid password',
      ],
    },
  }),
  methods: {
    ...mapActions({ Validate: "SetLogin" }),
    submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.Validate();
        this.$router.push({ path: `/` });
      }
    },
  },
}
</script>
