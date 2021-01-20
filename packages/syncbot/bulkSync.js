const fsPromise = require('fs/promises')
const path = require('path')

const tickersDir = path.resolve(__dirname, 'tickers')

async function bulkSync(type) {
  const data =  await fsPromise.readFile(path.join(tickersDir, `${type}.txt`), 'utf8')
  const lines = data.split('\n')
  const tickers = lines.map(line => line.split('\t')[0].filter(ticker => ticker.in))
  console.log(tickers)
}

bulkSync('AMEX');
