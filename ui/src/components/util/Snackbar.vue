<template lang="pug">
v-snackbar(
  v-model='isSnackBarShown',
  :timeout='timeout',
  :top='position === "top"',
  :bottom='position === "bottom"',
  :right='position === "right"',
  :left='position === "left"',
  :color='color'
) {{ snackbarText }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SnackBar',
  props: {
    isShown: {
      type: Boolean,
      required: true,
    },
    position: {
      type: String,
      required: false,
      default: 'bottom',
    },
    snackbarText: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
      default: 'green',
    },
    timeout: {
      type: Number,
      required: false,
      default: 2000,
    },
  },
  data() {
    return {
      isSnackBarShown: false,
    }
  },
  watch: {
    isShown(newValue) {
      this.isSnackBarShown = newValue
    },
  },
})
</script>
