export type JsonPrimitive = boolean | number | string | null
export type Json = JsonPrimitive | JsonArray | JsonMap
export interface JsonMap {
  [key: string]: Json
}
export interface JsonArray extends Array<Json> {}

export interface JsonViewOptions {
  maxDepth?: number
  rootObjectKey?: string
  showLinkAsClickable?: boolean
  limitRenderDepth?: number
  isClosedByDefault?: boolean
}

export type TreeViewDataType = 'number' | 'boolean' | 'null' | 'string' | 'unknown'

export interface ObjectStructure {
  key: string | number | undefined
  type: string
  value?: any
  isRoot?: boolean
  children?: any[]
}
