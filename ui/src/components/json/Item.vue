<template>
  <div class="tree-view-item">
    <div class="tree-view-item-leaf">
      <div class="tree-view-item-node" @click.stop="toggleOpen()" v-if="!isJsonPrimitive(data)">
        <span :class="{ opened: isOpen }" class="tree-view-item-key tree-view-item-key-with-chevron">{{
          getKey(data)
        }}</span>
        <span v-if="isPlainObject(data) && !isArray(data)" class="tree-view-item-hint">{{ propertyDisplayText }}</span>
        <span v-if="isArray(data)" class="tree-view-item-hint">[...]</span>
      </div>
      <div v-if="!limitRenderDepth || isOpen">
        <TreeViewItem
          :key="getKey(child)"
          :maxDepth="maxDepth"
          :currentDepth="currentDepth + 1"
          v-show="isOpen"
          v-for="child in data.children"
          :data="child"
          :showLinkAsClickable="showLinkAsClickable"
          :limitRenderDepth="limitRenderDepth"
        />
      </div>
    </div>
    <TreeViewValue
      v-if="isJsonPrimitive(data)"
      class="tree-view-item-leaf"
      :key-string="getKey(data)"
      :data="data.value"
      :showLinkAsClickable="showLinkAsClickable"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import TreeViewValue from './Value.vue'
import { isNumber, isPlainObject } from '../../utils/determineTypes'
import { ObjectStructure } from '../../type/interfaces'
import { defaultJsonViewOptions } from '../../constants'

@Component({
  components: {
    TreeViewValue,
  },
  name: 'TreeViewItem',
})
export default class TreeViewItem extends Vue {
  @Prop({ default: {} })
  data!: ObjectStructure

  @Prop({ default: defaultJsonViewOptions.maxDepth })
  maxDepth!: number

  @Prop({ default: 0 })
  currentDepth!: number

  @Prop({ required: true })
  showLinkAsClickable!: string

  @Prop({ default: defaultJsonViewOptions.limitRenderDepth })
  limitRenderDepth!: number

  @Prop({ default: defaultJsonViewOptions.isClosedByDefault })
  isClosedByDefault!: boolean

  @Prop({ default: false })
  isRoot!: boolean

  isOpen = !this.isClosedByDefault

  // Methods
  isArray(value: ObjectStructure) {
    return value.type === 'array'
  }

  isJsonPrimitive(jsonValue: ObjectStructure): boolean {
    // if it has any children, it's not a primitive
    return jsonValue.children ? false : true
  }

  toggleOpen() {
    this.isOpen = !this.isOpen
  }

  isPlainObject(value: ObjectStructure) {
    return isPlainObject(value)
  }

  /**
   * Selectively adds double quotes if the key is not a number
   */
  getKey(value: ObjectStructure): string {
    return isNumber(value.key) ? `${value.key}:` : `"${value.key}":`
  }

  mounted() {
    if (this.isRoot) this.isOpen = true
  }

  // Computed
  get propertyDisplayText() {
    const singularText = this.data.children?.length === 1 ? 'property' : 'properties'
    let propertiesText = (this.isOpen && singularText) || ''
    // if the length is 0, show nothing
    let lengthOfChildren = this.data.children?.length || ''
    if (!this.data.children?.length) propertiesText = ''
    if (!this.isOpen) lengthOfChildren = ''

    return lengthOfChildren + ' ' + propertiesText
  }

  get itemDisplayText() {
    const singularText = this.data.children?.length === 1 ? 'item' : 'items'
    let propertiesText = (this.isOpen && singularText) || ''
    // if the length is 0, show nothing
    let lengthOfChildren = this.data.children?.length || ''
    if (!this.data.children?.length) propertiesText = ''
    if (!this.isOpen) lengthOfChildren = ''

    return lengthOfChildren + ' ' + propertiesText
  }
}
</script>

<style scoped lang="sass">
.tree-view-item
  font-family: monaco, monospace
  font-size: 16px
  margin-left: 25px

.tree-view-item-node
  cursor: pointer
  position: relative
  white-space: nowrap

.tree-view-item-leaf
  white-space: nowrap

.tree-view-item-key
  font-weight: bold

.tree-view-item-key-with-chevron
  padding-left: 14px

.tree-view-item-key-with-chevron.opened::before
  top: 4px
  transform: rotate(90deg)
  -webkit-transform: rotate(90deg)

.tree-view-item-key-with-chevron::before
  color: #444
  content: '\25b6'
  font-size: 10px
  left: 1px
  position: absolute
  top: 3px
  transition: -webkit-transform 0.1s ease
  transition: transform 0.1s ease
  transition: transform 0.1s ease, -webkit-transform 0.1s ease
  -webkit-transition: -webkit-transform 0.1s ease

.tree-view-item-hint
  color: #ccc
</style>
