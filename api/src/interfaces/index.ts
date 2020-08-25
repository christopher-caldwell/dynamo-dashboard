export interface DynamoOptions {
  partitionKeySearchTerm: string
  rangeKeySearchTerm: string
  useGsi?: boolean
  rangeKeyComparisonOperator?: string
}
