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
        )
      v-col
         v-text-field(
          outlined,
          label='Range Key',
          :disabled='isLoading',
          :error-messages='inputErrorMessages',
          v-model='rangeKeyValue'
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

import client from '../../client'
import OperationHeader from '@/components/dynamo/OperationHeader.vue'
import JsonView from '@/components/dynamo/JsonView.vue'

@Component({
  components: {
    OperationHeader,
    JsonView,
  },
})
export default class DynamoOperation extends Vue {
  partitionKeyValue = '#MUSIC_TRACKER_TABLE_station_3322404_weekStartDate_2020-03-12'
  rangeKeyValue = '1010170337'
  inputErrorMessages = []
  isLoading = false
  jsonOutput = {}
  async sendRequest() {
    try {
      const { data } = (await client.get('/get-item', {
        params: {
          partitionKeySearchTerm: this.partitionKeyValue,
          rangeKeySearchTerm: this.rangeKeyValue,
        },
      })) as Record<string, unknown>
      console.log('res', data)
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
