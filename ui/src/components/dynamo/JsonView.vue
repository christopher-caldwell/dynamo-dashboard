<template lang="pug">
  tree-view(:data="data" :options="{maxDepth: 3}")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'JsonView',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
})
</script>
