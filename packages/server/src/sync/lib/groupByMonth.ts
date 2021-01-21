import { RawHistoricalPrice } from '../../finance-api/getHistoricalPrice'
import { format } from 'date-fns'
import { constants } from 'crypto'

type MonthlyHistoricalPrice = {
  closeDate: string // end date of month
  baseDate: string // yyyy-MM
  high: number
  low: number
  open: number
  close: number
  adjustedClose: number
}

export function groupByMonth(historicalPrices: RawHistoricalPrice[]) {
  return historicalPrices.reduce((acc, current) => {
    const date = new Date(current.date)
    const baseDate = format(date, 'yyyy-MM')
    const princeInfo = acc.find((info) => info.baseDate === baseDate)
    if (!princeInfo) {
      acc.push({
        baseDate,
        close: current.close,
        adjustedClose: current.adjClose,
        closeDate: current.date,
        high: current.high,
        low: current.low,
        open: current.open,
      })
    } else {
      princeInfo.high = Math.max(princeInfo.high, current.high)
      princeInfo.low = Math.min(princeInfo.low, current.low)
      princeInfo.open = current.open
    }
    return acc
  }, [] as MonthlyHistoricalPrice[])
}
