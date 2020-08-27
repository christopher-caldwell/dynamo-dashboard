export type Json = boolean | number | string | null | JsonArray | JsonMap
export interface JsonMap {
  [key: string]: Json
}
export interface JsonArray extends Array<Json> {}

export interface JsonViewOptions {
  maxDepth?: number
  rootObjectKey?: string
  modifiable?: boolean
  showLinkAsClickable?: boolean
  limitRenderDepth?: number
}

export type TreeViewDataType = 'number' | 'boolean' | 'null' | 'string' | 'unknown'

export interface ObjectStructure {
  key: Json
  type: string
  value?: any
  isRoot?: boolean
  children?: any[]
}
