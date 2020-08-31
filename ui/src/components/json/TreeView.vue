<template lang="pug">
  div.tree-view-wrapper
    TreeViewItem.tree-view-item-root(
      :data="parsedData"
      :maxDepth="options.maxDepth"
      :currentDepth="0"
      :modifiable="options.modifiable"
      :showLinkAsClickable="options.showLinkAsClickable"
      :limitRenderDepth="options.limitRenderDepth"
      :isClosedByDefault="options.isClosedByDefault"
      :isRoot="true"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import TreeViewItem from './Item.vue'
import { JsonViewOptions, Json, ObjectStructure, JsonPrimitive, JsonArray } from '../../type/interfaces'
import { defaultJsonViewOptions } from '../../constants'
import { isArray, isObject, map, isPlainObject } from '../../utils/determineTypes'

@Component({
  name: 'TreeView',
  components: {
    TreeViewItem,
  },
  head: {
    style() {
      // TS doesn't recognize the vue instance here, so casting to the default
      const {
        options: { colors },
      } = (this as unknown) as { options: JsonViewOptions }
      return [
        {
          type: 'text/css',
          inner: `
.tree-value-number {
  color: ${colors.number};
}
.tree-value-string {
  color: ${colors.string};
}
.tree-value-boolean {
  color: ${colors.boolean};
}
.tree-value-null {
  color: ${colors.null};
}
`,
        },
      ]
    },
  },
})
export default class TreeView extends Vue {
  @Prop({ default: () => ({}) })
  data!: Json
  @Prop({ default: () => defaultJsonViewOptions })
  options!: JsonViewOptions

  handleJsonPrimitive(valueToTransform: JsonPrimitive, keyForValue?: number | string): ObjectStructure {
    return {
      key: keyForValue,
      type: 'value',
      value: valueToTransform,
    }
  }

  /**
   * Recursively calls `generateChildrenFromCollection` until the value is primitive
   */
  handleJsonArray(arrayToTransform: Json, keyForArray: number): ObjectStructure {
    return {
      key: keyForArray,
      type: 'array',
      children: this.generateChildrenFromCollection(arrayToTransform),
    }
  }

  /**
   * Recursively calls `generateChildrenFromCollection` until the value is primitive
   */
  handleJsonObject(objectToTransform: Json, keyForObject?: string, isRootObject = false): ObjectStructure {
    return {
      key: keyForObject,
      type: 'object',
      isRoot: isRootObject,
      children: this.generateChildrenFromCollection(objectToTransform),
    }
  }

  generateChildrenFromCollection(providedJson: Json): ObjectStructure[] {
    return map(providedJson as JsonArray, (value: Json, keyOrIndex: number | string) => {
      // recursively calls until it's a primitive
      if (isObject(value)) {
        return this.handleJsonObject(value, keyOrIndex.toString())
      }
      // recursively calls until it's a primitive
      if (isArray(value)) {
        console.log('val is an array')
        return this.handleJsonArray(value, Number(keyOrIndex))
      }
      return this.handleJsonPrimitive(value, keyOrIndex)
    })
  }

  // Computed
  get parsedData() {
    // the provided value is not a complex structure, so handle primitive
    if (isArray(this.data)) {
      return this.handleJsonArray(this.data, 0)
    }
    if (isPlainObject(this.data)) {
      return this.handleJsonObject(this.data, this.options.rootObjectKey, true)
    }

    return this.handleJsonPrimitive(this.data as JsonPrimitive, this.options.rootObjectKey)
  }
}
</script>

<style lang="sass">
.tree-view-wrapper
  overflow: scroll
  padding-bottom: 10vh

/* Find the first nested node and override the indentation */
.tree-view-item-root > .tree-view-item-leaf > .tree-view-item
  margin-left: 0 !important

/* Root node should not be indented */
.tree-view-item-root
  margin-left: 0 !important
</style>
