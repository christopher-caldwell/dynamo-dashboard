<template>
  <div class="tree-view-wrapper">
    <tree-view-item
      class="tree-view-item-root"
      :data="parsedData"
      :max-depth="options.maxDepth"
      :current-depth="0"
      :modifiable="options.modifiable"
      :showLinkAsClickable="options.showLinkAsClickable"
      :limit-render-depth="options.limitRenderDepth"
      @change-data="onChangeData"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import map from 'lodash.map'
import drop from 'lodash.drop'
import dropRight from 'lodash.dropright'
import TreeViewItem from './Item.vue'
import { JsonViewOptions, Json, JsonMap, ObjectStructure } from '../../type/interfaces'
import { defaultJsonViewOptions } from '../../constants'
import { isArray, isPlainObject, isObject, last } from '../../utils/determineTypes'

@Component({
  name: 'TreeView',
  components: {
    TreeViewItem,
  },
})
export default class TreeView extends Vue {
  @Prop({ default: () => ({}) })
  data!: Json
  @Prop({ default: () => defaultJsonViewOptions })
  options!: JsonViewOptions

  handleJsonPrimitive(valueToTransform: any, keyForValue: number | string): ObjectStructure {
    return {
      key: keyForValue,
      type: 'value',
      value: valueToTransform,
    }
  }

  /**
   * Recursively calls `generateChildrenFromCollection` until the value is primitive
   */
  handleJsonArray(arrayToTransform: any[], keyForArray: number): ObjectStructure {
    return {
      key: keyForArray,
      type: 'array',
      children: this.generateChildrenFromCollection(arrayToTransform),
    }
  }

  /**
   * Recursively calls `generateChildrenFromCollection` until the value is primitive
   */
  handleJsonObject(objectToTransform: Json, keyForObject: string, isRootObject = false): ObjectStructure {
    return {
      key: keyForObject,
      type: 'object',
      isRoot: isRootObject,
      children: this.generateChildrenFromCollection(objectToTransform),
    }
  }

  generateChildrenFromCollection(providedJson: any[] | Json) {
    return map(providedJson, (value: Json, keyOrIndex: number | string) => {
      // recursively calls until it's a primitive
      if (isObject(value)) {
        return this.handleJsonObject(value, keyOrIndex.toString())
      }
      // recursively calls until it's a primitive
      if (isArray(value)) {
        return this.handleJsonArray(value, Number(keyOrIndex))
      }
      return this.handleJsonPrimitive(value, keyOrIndex)
    })
  }

  onChangeData(path: any[], value: any): void {
    const lastKey = last(path)
    const newPath = dropRight(drop(path)) as any[]

    let targetObject = this.data
    newPath.forEach(key => {
      targetObject = targetObject[key]
    })

    if (targetObject[lastKey] !== value) {
      targetObject[lastKey] = value
      this.$emit('change-data', targetObject)
    }
  }

  // Computed
  get parsedData() {
    // the provided value is not a complex structure, so handle primitive
    if (!isObject(this.data) && !isArray(this.data)) {
      return this.handleJsonPrimitive(this.data, this.options.rootObjectKey)
    }

    return this.handleJsonObject(this.data, this?.options.rootObjectKey, true)
  }
}
</script>

<style scoped>
.tree-view-wrapper {
  overflow: auto;
}

/* Find the first nested node and override the indentation */
.tree-view-item-root > .tree-view-item-leaf > .tree-view-item {
  margin-left: 0 !important;
}

/* Root node should not be indented */
.tree-view-item-root {
  margin-left: 0 !important;
}
</style>
