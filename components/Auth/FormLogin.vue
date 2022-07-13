<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation>
    <v-text-field
      v-model="user.email"
      name="email"
      :rules="emailRules"
      label="E-mail"
      filled
      rounded
      class="rounded-lg"
      prepend-inner-icon="email" />
    <v-text-field
      v-model="user.password"
      name="password"
      filled
      rounded
      class="rounded-lg"
      :rules="passwordRules"
      :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      prepend-inner-icon="lock"
      @click:append="isPasswordVisible = !isPasswordVisible" />
    <v-btn
      class="rounded-lg"
      large
      :block="true"
      color="#516BD9"
      dark
      @click="onSubmit">
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'FormLogin',
  data () {
    return {
      valid: true,
      isPasswordVisible: false,
      user: {},
      emailRules: [
        v => !!v || 'E-mail is required!',
        v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'E-mail not match!',
      ],
      passwordRules: [
        v => !!v || 'Password is required!'
      ],
    };
  },
  methods: {
    onSubmit () {
      const validate = this.$refs.form.validate();

      if (validate) {
        this.$emit('submit', this.user, () => {
          this.user = {}
        });
      }
    }
  }
};
</script>

<style>
</style>
