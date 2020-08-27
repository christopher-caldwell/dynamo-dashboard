<template lang="pug">
span
  v-row
    v-col
      h1 {{ nameOfOperation }}
  v-divider
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { dynamoOperations } from '../../constants'
import { DynamoOperation } from '../../type/types'

@Component({})
export default class OperationHeader extends Vue {
  get nameOfOperation() {
    const path = this.$route.path as DynamoOperation
    return dynamoOperations[path]
  }
}
</script>
