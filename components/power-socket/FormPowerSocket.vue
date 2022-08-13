<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onSubmit">
      <v-row no-gutters>
        <v-col cols="12" md="12" class="pa-1">
          <v-text-field
            v-model="powerSocket.serialName"
            label="SerialName"
            filled
            rounded
            class="rounded-lg" />
        </v-col>
      </v-row>
      <v-btn
        block
        type="submit"
        color="primary"
        :loading="loading"
        :disabled="loading">
        {{ buttonName }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ComponentFormPowerSocket',
  data () {
    return {
      loading: false,
      valid: true,
      buttonName: 'Create',
      powerSocket: {
        serialName: '',
        connection: false,
        status: 'PENDING',
        data: {} // { uni: '-', ampere: '-', voit: '-', wat: '-', }
      }
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true;

      await this.$api.powerSocketService.create(this.powerSocket);
      this.loading = false;
      this.powerSocket.serialName = ''
    }
  }
}
</script>

<style scoped>

</style>
