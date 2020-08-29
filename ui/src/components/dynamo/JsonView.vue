<template lang="pug">
  JsonTreeView(:data='data')  
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import JsonTreeView from '@/components/json/TreeView.vue'
import { Json } from '../../type/interfaces'
import { mockData } from '../../constants'

@Component({
  name: 'JsonView',
  components: {
    JsonTreeView,
  },
})
export default class JsonView extends Vue {
  @Prop({ required: true })
  data!: Json

  mockData = mockData
}
</script>
