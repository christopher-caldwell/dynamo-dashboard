import { JsonViewOptions } from '@/type/interfaces'

export const dynamoOperations = {
  '/query': 'Query',
  '/get-item': 'Get Item',
  '/put-item': 'Put Item',
}

export const defaultJsonViewOptions: JsonViewOptions = {
  maxDepth: 4,
  rootObjectKey: 'root',
  modifiable: false,
  showLinkAsClickable: false,
  limitRenderDepth: 0,
}

export const mockData = {
  something: 123,
  somethingNested: {
    nestedProp: 123,
  },
}
