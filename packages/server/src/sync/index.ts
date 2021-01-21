import 'dotenv/config'
import 'reflect-metadata'
import { createConnections } from 'typeorm'
import Syncbot from './Syncbot'

// commit test
createConnections().then((connection) => {
  const syncbot = new Syncbot()
  syncbot.syncStocks()
})
