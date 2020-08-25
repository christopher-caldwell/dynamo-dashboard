import { Request, Response } from 'express'
import { getItem as getDynamoItem } from 'common-aws-actions/dist/dynamo'
import { AttributeMap } from 'common-aws-actions/dist/dynamo/interfaces'

import { DynamoOptions } from '../interfaces'
import { tableName, partitionKeyName, rangeKeyName } from '../constants'

const getItem = (partitionSearchTerm: string, rangeSearchTerm: string): Promise<AttributeMap> => {
  const key = {
    [partitionKeyName]: partitionSearchTerm,
    [rangeKeyName]: rangeSearchTerm,
  }
  return getDynamoItem(tableName, key)
}

export default async (req: Request, res: Response): Promise<void> => {
  const { partitionKeySearchTerm, rangeKeySearchTerm } = (req.query as unknown) as DynamoOptions
  const item = await getItem(partitionKeySearchTerm, rangeKeySearchTerm)
  res.send(item)
}
