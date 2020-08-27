<template lang="pug">
  v-app
    Header
    v-main
      router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/header/Header.vue'
export default Vue.extend({
  name: 'App',
  components: {
    Header,
  },
})
</script>
