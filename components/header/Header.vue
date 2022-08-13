<template>
  <div class="text-h4 d-flex align-center mb-8">
    <v-btn v-if="!topLevel" icon class="mx-2" @click="goBack">
      <v-icon>
        mdi-chevron-left
      </v-icon>
    </v-btn>
    <slot name="default">
      {{ title }}
    </slot>
    <v-spacer />
    <div class="space-x-2">
      <slot name="actions" />
      <v-btn v-if="creatable" color="primary" @click="createItem">
        <v-icon left>
          mdi-plus
        </v-icon>
        {{ title }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => {}
    },
    topLevel: {
      type: Boolean,
      default: false,
    },
    useDialog: {
      type: Boolean,
      default: false,
    },
    creatable: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: null
    },
    backPath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: {
        show: false,
      }
    }
  },
  methods: {
    createItem () {
      if (this.useDialog) {
        this.dialog.show = true;
        return;
      }

      const path = { path: 'create', append: true, query: { ...this.createQuery } }

      if (this.basePath) {
        path.path = `${this.basePath}/create`
        path.append = false
      }

      this.$router.push(path);
    },
    close () {
      this.dialog.show = false;
    },
    goBack () {
      if (this.backPath) {
        return this.$router.push(this.backPath)
      }

      const pathLength = this.$route.path.split('/').length - 1
      if (pathLength === 2) {
        this.$router.push('./')
      } else if (pathLength === 3 || pathLength === 4) {
        this.$router.push('..')
      }
    }
  }
}
</script>

<style scoped>
.space-x-2 > * + * {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
</style>
