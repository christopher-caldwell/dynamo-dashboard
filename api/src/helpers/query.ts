import { queryItem } from 'common-aws-actions/dist/dynamo'
import { ItemList, SearchConfig } from 'common-aws-actions/dist/dynamo/interfaces'
import { Request, Response } from 'express'

import { DynamoOptions } from '../interfaces'
import { tableName, partitionKeyName, rangeKeyName, gsiName, gsiPartitionKeyName, gsiRangeKeyName } from '../constants'

const query = async (
  { useGsi = false, partitionKeySearchTerm, rangeKeySearchTerm }: DynamoOptions,
  logParams?: boolean
): Promise<ItemList | undefined> => {
  const params: SearchConfig = {
    TableName: tableName,
    partitionKeyName,
    partitionKeySearchTerm,
  }
  if (rangeKeySearchTerm) {
    params.rangeKeyName = rangeKeyName
    params.rangeKeySearchTerm = rangeKeySearchTerm
  }
  if (useGsi) {
    params.indexToQuery = gsiName
    params.partitionKeyName = gsiPartitionKeyName
  }
  if (useGsi && rangeKeySearchTerm) {
    params.rangeKeyName = gsiRangeKeyName
  }

  return await queryItem(params, logParams)
}

export default async (req: Request, res: Response): Promise<void> => {
  const queryParams = (req.body as unknown) as DynamoOptions
  const items = await query(queryParams)
  res.send(items)
}
