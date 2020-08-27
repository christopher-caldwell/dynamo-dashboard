<template>
  <div class="tree-view-item">
    <div v-if="isObject(data)" class="tree-view-item-leaf">
      <div class="tree-view-item-node" @click.stop="toggleOpen()">
        <span :class="{ opened: isOpen }" class="tree-view-item-key tree-view-item-key-with-chevron">{{
          getKey(data)
        }}</span>
        <span class="tree-view-item-hint">{{ propertyDisplayText }}</span>
      </div>
      <div v-if="!limitRenderDepth || isOpen">
        <tree-view-item
          :key="getKey(child)"
          :max-depth="maxDepth"
          :current-depth="currentDepth + 1"
          v-show="isOpen"
          v-for="child in data.children"
          :data="child"
          :modifiable="modifiable"
          :showLinkAsClickable="showLinkAsClickable"
          :limit-render-depth="limitRenderDepth"
          @change-data="onChangeData"
        />
      </div>
    </div>
    <div v-if="isArray(data)" class="tree-view-item-leaf">
      <div class="tree-view-item-node" @click.stop="toggleOpen()">
        <span :class="{ opened: isOpen }" class="tree-view-item-key tree-view-item-key-with-chevron">{{
          getKey(data)
        }}</span>
        <span class="tree-view-item-hint">{{ data.children.length }} {{ itemDisplayText }}</span>
      </div>
      <div v-if="!limitRenderDepth || isOpen">
        <tree-view-item
          :key="getKey(child)"
          :max-depth="maxDepth"
          :current-depth="currentDepth + 1"
          v-show="isOpen"
          v-for="child in data.children"
          :data="child"
          :modifiable="modifiable"
          :showLinkAsClickable="showLinkAsClickable"
          :limit-render-depth="limitRenderDepth"
          @change-data="onChangeData"
        />
      </div>
    </div>
    <tree-view-item-value
      v-if="isValue(data)"
      class="tree-view-item-leaf"
      :key-string="getKey(data)"
      :data="data.value"
      :modifiable="modifiable"
      :showLinkAsClickable="showLinkAsClickable"
      @change-data="onChangeData"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import TreeViewValue from './Value.vue'
import {
  isBoolean,
  isNull,
  isString,
  isNumber,
  isPlainObject,
  isObject,
  isArray,
  last,
} from '../../utils/determineTypes'
import { Json, JsonViewOptions, ObjectStructure } from '../../type/interfaces'
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

  @Prop({ default: defaultJsonViewOptions.modifiable })
  modifiable!: boolean

  @Prop({ required: true })
  showLinkAsClickable!: string

  @Prop({ default: defaultJsonViewOptions.limitRenderDepth })
  limitRenderDepth!: number

  isOpen = this.currentDepth < this.maxDepth

  mounted() {
    console.log('data', this.data)
  }

  // Methods
  isArray(value) {
    return isArray(value)
  }
  isValue(value) {
    return !this.isObject(value) && !this.isArray(value)
  }

  toggleOpen() {
    this.isOpen = !this.isOpen
  }

  isObject(value: any) {
    return isObject(value)
  }

  getKey(value: { key: number | unknown }): string {
    return isNumber(value.key) ? `${value.key}:` : `"${value.key}":`
  }

  onChangeData(path: any[], value: any) {
    const newPath = [this.data.key, ...path]
    this.$emit('change-data', newPath, value)
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

<style scoped>
.tree-view-item {
  font-family: monaco, monospace;
  font-size: 14px;
  margin-left: 18px;
}

.tree-view-item-node {
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}

.tree-view-item-leaf {
  white-space: nowrap;
}

.tree-view-item-key {
  font-weight: bold;
}

.tree-view-item-key-with-chevron {
  padding-left: 14px;
}

.tree-view-item-key-with-chevron.opened::before {
  top: 4px;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

.tree-view-item-key-with-chevron::before {
  color: #444;
  content: '\25b6';
  font-size: 10px;
  left: 1px;
  position: absolute;
  top: 3px;
  transition: -webkit-transform 0.1s ease;
  transition: transform 0.1s ease;
  transition: transform 0.1s ease, -webkit-transform 0.1s ease;
  -webkit-transition: -webkit-transform 0.1s ease;
}

.tree-view-item-hint {
  color: #ccc;
}
</style>
