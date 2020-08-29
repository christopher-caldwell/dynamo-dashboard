import { JsonViewOptions } from '@/type/interfaces'

export const dynamoOperations = {
  '/query': 'Query',
  '/get-item': 'Get Item',
  '/put-item': 'Put Item',
}

export const defaultJsonViewOptions: JsonViewOptions = {
  maxDepth: 4,
  rootObjectKey: 'root',
  showLinkAsClickable: false,
  limitRenderDepth: 0,
  isClosedByDefault: true,
}

export const mockData = {
  something: 123,
  somethingNested: {
    nestedProp: 123,
  },
}
