<template lang="pug">
  v-container
    v-row
      v-col
        OperationWrapper
</template>

<script lang="ts">
import Vue from 'vue'
import OperationWrapper from '@/components/dynamo/Wrapper.vue'

export default Vue.extend({
  name: 'DynamoOperation',
  components: {
    OperationWrapper,
  },
})
</script>
