<template lang="pug">
  v-container.operation-container
    v-row
      v-col
        OperationHeader
    v-row
      v-col
         v-text-field(
          outlined,
          label='Partition Key',
          :disabled='isLoading',
          :error-messages='inputErrorMessages',
          v-model='partitionKeyValue'
          required
          hide-details
        )
      v-col
         v-text-field(
          outlined,
          label='Range Key',
          :disabled='isLoading',
          :error-messages='inputErrorMessages',
          v-model='rangeKeyValue'
          hide-details
        )
    v-row
      v-col
        v-expansion-panels
          v-expansion-panel
            v-expansion-panel-header More Options
            v-expansion-panel-content
              v-container
                v-row
                  v-col
                    h3 Optional Parameters
                v-row
                  v-col
                    v-text-field(
                      outlined,
                      label='GSI Partition',
                      :disabled='isLoading',
                      :error-messages='inputErrorMessages',
                      v-model='partitionKeyValue'
                      required
                      hide-details
                    )
                  v-col
                    v-text-field(
                      outlined,
                      label='Partition Key',
                      :disabled='isLoading',
                      :error-messages='inputErrorMessages',
                      v-model='partitionKeyValue'
                      required
                      hide-details
                    )
    v-row.scoll-container
      v-col
        JsonView(:data='jsonOutput')
    v-btn.send-button(fab @click='sendRequest' color='success')
      v-icon mdi-send
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import OperationHeader from '@/components/dynamo/OperationHeader.vue'
import JsonView from '@/components/dynamo/JsonView.vue'
import client from '../../client'
import { Json } from '../../type/interfaces'

@Component({
  components: {
    OperationHeader,
    JsonView,
  },
})
export default class DynamoOperation extends Vue {
  partitionKeyValue = ''
  rangeKeyValue = ''
  inputErrorMessages = []
  isLoading = false
  jsonOutput: Json = {}
  async sendRequest() {
    try {
      const { data } = (await client.get('/get-item', {
        params: {
          partitionKeySearchTerm: this.partitionKeyValue,
          rangeKeySearchTerm: this.rangeKeyValue,
        },
      })) as { data: Json }
      this.jsonOutput = data
    } catch (error) {
      console.error('ops', error.response)
    }
  }
}
</script>

<style lang="sass" scoped>
.operation-container
  position: relative
  height: 100vh
.send-button
  position: absolute
  bottom: 100px
  right: 0
.scoll-container
  height: 75%
  overflow: scroll
</style>
