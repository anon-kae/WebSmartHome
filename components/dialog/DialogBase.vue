<template>
  <v-dialog v-model="isVisible" max-width="600px" :persistent="persistent" scrollable>
    <v-card>
      <slot name="title">
        <v-card-title class="d-flex flex-nowrap justify-space-between">
          <div class="font-weight-bold" :class="color || 'white--text'">
            {{ title }}
          </div>
          <v-btn v-if="!persistent" icon @click="setVisible(false)">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
      </slot>
      <v-card-text>
        <slot name="description">
          {{ description }}
        </slot>
      </v-card-text>
      <v-card-actions v-if="action" class="justify-end">
        <slot name="actions">
          <div>
            <v-btn text @click="cancel">
              {{ $t(secondaryButtonKey) }}
            </v-btn>
            <v-btn :color="color || 'primary'" @click="confirm">
              {{ $t(primaryButtonKey) }}
            </v-btn>
          </div>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponentDialogBase',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '',
    },
    action: {
      type: Boolean,
      required: false
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
    },
    color: {
      type: String,
      default: null,
    },
    persistent: {
      type: Boolean,
      default: false,
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
