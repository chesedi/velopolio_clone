import * as fs from 'fs/promises'
import * as path from 'path'
import { getHistoricalPrice } from '../finance-api/getHistoricalPrice'
import { getSectorWeightings } from '../finance-api/getSectorWeightings'
import { getStockProfile } from '../finance-api/getStockProfile'
import { groupByMonth } from './lib/groupByMonth'

const tickersDir = path.resolve(__dirname, 'tickers')

class Syncbot {
  async parseTickers(name: string) {
    const data = await fs.readFile(path.join(tickersDir, `${name}.txt`), 'utf8')
    const lines = data.split('\n')
    const tickers = lines
      .map((line) => line.split('\t')[0])
      .filter((ticker) => !ticker.includes('.'))
    return tickers
  }

  async loadTickers() {
    const tickers = await this.parseTickers('INITIAL')
    // TODO: load more tickers
    return tickers
  }

  async syncStocks() {
    // const tickers = await this.loadTickers()
    // const profile = await getStockProfile('vv')
    // const sectorWeightings = await getSectorWeightings('VV')
    const historicalPrice = await getHistoricalPrice('VV')

    console.log(groupByMonth(historicalPrice))
  }
}

export default Syncbot
