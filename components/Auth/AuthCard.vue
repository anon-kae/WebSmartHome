<template>
  <v-card class="mx-auto pa-10" max-width="450" width="500" outlined>
    <v-card-title class="justify-center">
      <!-- <v-img :src="require('../../assets/images/logo-willife-light.png')" min-height="200" max-width="200" /> -->
      <span class="text-sm-h4 text-md-h4 text-xl-h4 font-weight">
        {{ title }}
      </span>
    </v-card-title>
    <v-card-subtitle class="text-center">
      <div class="text-light--text">
        {{ subTitle }}
      </div>
    </v-card-subtitle>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AuthCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>

</style>
