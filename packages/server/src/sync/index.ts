import 'dotenv/config'
import 'reflect-metadata'
import { createConnections } from 'typeorm'
import Syncbot from './Syncbot'

// commit testf
createConnections().then((connection) => {
  const syncbot = new Syncbot()
  syncbot.syncStocks()
})
