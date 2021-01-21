import client from './client'

type Duration = {
  from?: string
  to?: string
}

export async function getHistoricalPrice(ticker: string, duration?: Duration) {
  const response = await client.get<GetHistoricalPriceResult>(
    `/api/v3/historical-price-full/${ticker}`,
    {
      params: duration,
    }
  )
  return response.data.historical
}

export interface RawHistoricalPrice {
  date: string
  open: number
  high: number
  low: number
  close: number
  adjClose: number
  volume: number
  unadjustedVolume: number
  change: number
  changePercent: number
  vwap: number
  label: string
  changeOverTime: number
}

type GetHistoricalPriceResult = {
  symbol: string
  historical: RawHistoricalPrice[]
}
