<template>
  <component-auth-layout>
    <component-auth-card :sub-title="subTitle" :title="title">
      <component-form-login @submit="login" />
    </component-auth-card>
  </component-auth-layout>
</template>

<script>
import ComponentAuthLayout from '../components/Auth/AuthLayout';
import ComponentFormLogin from '../components/Auth/FormLogin';
import ComponentAuthCard from '../components/Auth/AuthCard';
export default {
  name: 'LoginPage',
  layout: 'anonymous',
  components: {
    ComponentAuthCard,
    ComponentFormLogin,
    ComponentAuthLayout
  },
  data () {
    return {
      title: 'SmartHome',
      subTitle: 'welcome to smart home',
      valid: true,
      isPasswordVisible: false,
      user: {},
    }
  },
  methods: {
    async login ({ email, password }, clearForm) {
      try {
        await this.$store.dispatch('auth/login', { email, password });
      } catch (error) {
        throw error;
      }

      await this.$router.push('/')
    }
  }
}
</script>
