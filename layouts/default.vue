<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      permanent
      clipped
      fixed
      app>
      <v-list dense nav rounded>
        <!-- Home -->
        <v-list-item nuxt link to="/">
          <v-list-item-icon>
            <v-icon>
              dashboard
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Dashboard
          </v-list-item-title>
        </v-list-item>
        <v-divider class="mb-3 mt-3" />

        <v-list-group prepend-icon="home">
          <template #activator>
            <v-list-item-title>
              Home Control
            </v-list-item-title>
          </template>
          <v-list>
            <v-list-item to="/power-socket">
              <v-list-item-icon>
                <v-icon>
                  electrical_services
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Power socket
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      class="px-lg-4"
      color="primary"
      height="60"
      dark
      app
      fixed>
      <h2>Smart Home</h2>
      <v-spacer />
      <v-menu v-if="$vuetify.breakpoint.mdAndUp" offset-y>
        <template #activator="{ on }">
          <v-btn color="primary text-capitalize" dark depressed large v-on="on">
            <v-avatar class="mr-1" size="36">
              <v-icon>account_circle</v-icon>
            </v-avatar>
            {{ user.name }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-content>
              <v-list-item-title class="text-body-1">
                logout
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main class="pl-0">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <component-snackbar :style="{ left: 0, top: 0 }" />
  </v-app>
</template>

<script>
import ComponentSnackbar from '@/components/snackbar/Snackbar'

export default {
  name: 'DefaultLayout',
  middleware: 'DefaultLayoutMiddleware',
  components: {
    ComponentSnackbar
  },
  data () {
    return {
      user: {
        name: 'Anon Kaedsalung',
        picture: ''
      },
      drawer: true
    }
  },
  errorCaptured (error) {
    const errorHandler = async error => {
      const errorMessage = error.response.data.error.message;
      await this.$store.dispatch('snackbar/setErrorMessage', errorMessage);
    };

    if (error && error.response) {
      errorHandler(error);
      return false;
    } else if (process.env.SH_CLIENT_NOTIFY_UI_ERROR === 'true') {
      const errorMessage = `[UI] ${error.message}`;
      this.$store.dispatch('snackbar/setErrorMessage', errorMessage);
      return false;
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      window.location.reload()
    },
  }
}
</script>

<style scoped>

.v-navigation-drawer .v-list-group .v-list {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 16px;
}

.theme--dark .v-navigation-drawer .v-list-group .v-list {
  background-color: #555555;
}

.theme--light .v-navigation-drawer .v-list-group .v-list {
  background-color: #eaeaea;
}
</style>
