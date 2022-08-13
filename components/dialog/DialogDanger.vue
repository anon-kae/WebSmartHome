<template>
  <v-dialog v-model="isVisible" max-width="600px" scrollable>
    <v-card>
      <slot name="title">
        <v-card-title class="d-flex flex-nowrap justify-space-between">
          <div class="font-weight-bold red--text">
            {{ title }}
          </div>
          <v-btn icon @click="setVisible(false)">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
      </slot>
      <v-card-text>
        <v-alert color="text" outlined>
          <div class="d-flex align-start">
            <v-icon color="red" tag="div">
              mdi-alert
            </v-icon>
            <div class="ml-4">
              <slot name="description">
                {{ description }}
              </slot>
            </div>
          </div>
        </v-alert>
      </v-card-text>
      <v-card-actions class="justify-end">
        <slot name="actions">
          <div>
            <v-btn text @click="cancel">
              NO
            </v-btn>
            <v-btn color="error" @click="confirm">
              YES
            </v-btn>
          </div>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponentDialogDanger',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    primaryButtonKey: {
      type: String,
      default: 'btn.yes',
    },
    secondaryButtonKey: {
      type: String,
      default: 'btn.no',
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.value;
      },
      set (value) {
        this.setVisible(value);
      }
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm');
    },
    cancel () {
      this.isVisible = false;
      this.$emit('cancel');
    },
    setVisible (value) {
      this.$emit('input', value);
    }
  }
}
</script>
