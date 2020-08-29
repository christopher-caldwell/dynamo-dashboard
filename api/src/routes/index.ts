import { Express } from 'express'
import bodyParser from 'body-parser'

import getItem from '../helpers/getItem'
import queryItem from '../helpers/query'

const routeHandler = (app: Express) => {
  app.use(bodyParser.json())

  app.get('/get-item', (req, res) => {
    return getItem(req, res)
  })
  app.get('/query', (req, res) => {
    return queryItem(req, res)
  })
}

export default routeHandler
