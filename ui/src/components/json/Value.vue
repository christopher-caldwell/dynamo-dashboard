-<template>
  <div>
    <span class="tree-view-item-key">{{ keyString }}</span>
    <input
      v-if="modifiable"
      class="tree-view-item-value"
      :class="getValueType(data)"
      v-model="valueString"
      @keyup.enter="onUpdateData"
      @blur="onUpdateData"
    />
    <span v-else class="tree-view-item-value" :class="getValueType(data)"> {{ valueFormed }} </span>
    <span v-show="error">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { Json, TreeViewDataType } from '../../type/interfaces'
import { isBoolean, isString, isNumber, isNull } from '../../utils/determineTypes'

@Component({
  name: 'TreeViewItem',
})
export default class TreeViewItem extends Vue {
  @Prop({ default: {} })
  data!: Json

  @Prop({ default: 'Example' })
  exampleProperty!: string

  @Prop({ default: false })
  modifiable!: boolean

  @Prop({ default: false })
  keyString!: string

  @Prop({ default: false })
  showLinkAsClickable!: boolean

  valueString = this.data && this.data.toString()
  error = false

  get valueFormed() {
    return this.getValue(this.data)
  }

  @Watch('valueFormed')
  handleValueFormedChanged(val: any) {
    this.$set(this, 'valueString', isString(val) ? val.replace(/^["]+|["]+$/g, '') : val)
  }

  mounted() {
    console.log('data', this.data)
  }

  onUpdateData() {
    try {
      const v = this.typedValue(this.valueString)
      this.error = false
      this.$emit('change-data', [], v)
    } catch (err) {
      this.error = err
    }
  }

  typedValue(value: any) {
    if (value === '') throw new Error('Value is empty string')

    switch (this.data) {
      case isNumber(this.data):
        return Number(value)
      case isBoolean(value):
        return value ? true : false
      case isString(this.data):
        return this.data + ''
      default:
        return value
    }
  }

  /**
   * Formats the value into legible JSON
   */
  getValue(value: number | string | null | unknown): number | string | null | unknown {
    if (isNumber(value)) {
      return value
    }
    if (isNull(value)) {
      return 'null'
    }
    if (isString(value)) {
      return `"${value}"`
    }
    console.log('value', value)
    return value
  }

  // This methods defines which class name is applied to the value
  getValueType(value: number | boolean | null | string | unknown): TreeViewDataType {
    if (isNumber(value)) {
      return 'number'
    }
    if (isBoolean(value)) {
      return 'boolean'
    }
    if (isNull(value)) {
      return 'null'
    }
    if (isString(value)) {
      return 'string'
    }
    return 'unknown'
  }
}
</script>
