<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <component-snackbar :style="{ left: 0, top: 0 }" />
  </v-app>
</template>

<script>
import ComponentSnackbar from '../components/Snackbar/Snackbar'

export default {
  name: 'AnonymousLayout',
  middleware: 'UnauthenticatedLayoutMiddleware',
  components: { ComponentSnackbar },
  errorCaptured (error) {
    const errorHandler = async error => {
      const errorMessage = error.message.replace('Firebase:', '');
      await this.$store.dispatch('snackbar/setErrorMessage', errorMessage);
    };

    if (error && error.message) {
      errorHandler(error);
      return false;
    } else if (process.env.SH_CLIENT_NOTIFY_UI_ERROR === 'true') {
      const errorMessage = `[UI] ${error.message}`;
      this.$store.dispatch('snackbar/setErrorMessage', errorMessage);
      return false;
    }
  },
}
</script>
