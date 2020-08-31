<template lang='pug'>

  .home
    div
      v-row
        v-col(align='center')
          img(alt="iHeart logo" src="../assets/logo.png")
        
      v-row
        v-col(align='center')
          h1 Local DynamoDB Dashboard
      v-row
        v-col(align='center')
          router-link(to='/get-item') Get Item
        v-col(align='center')
          router-link(to='/query') Query
      
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
})
</script>

<style lang="sass" scoped>
.home
  display: flex
  justify-content: center
  align-items: center
  height: 80%
  width: 100%
</style>