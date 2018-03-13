

/**
 * @file TicksLoader
 * @author Jordane CURÉ
 */

import { marketTickStore, IMarketTicks } from './MarketTicksStore'
import { ITick } from './models/ITick'

export class CryptoPrice {

    private market: IMarketTicks
    private currentDate: number

    constructor(marketName: string) {
        this.market = marketTickStore.getMarket(marketName)
        this.currentDate = this.market.asArray[0].time
    }

    public getOldestTick = (): ITick => {
        return this.market.asArray[0]
    }

    public getYoungestTick = (): ITick => {
        return this.market.asArray[this.market.asArray.length - 1]
    }

    public getLastTick = (): ITick => {
        return this.market.asMap[this.currentDate]
    }

    public getLastTicks = (numberOfTicks: number): ITick[] => {

        const currentTickIndex = this.market.asArray.indexOf(this.market.asMap[this.currentDate])

        return this.market.asArray.slice(currentTickIndex - numberOfTicks, currentTickIndex)
    }

    public setDate = (date: number): void => {
        this.currentDate = date
    }

}

