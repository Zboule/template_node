
/**
 * @file MarketTickStore
 * @author Jordane CURÉ
 */

import { ITick } from './models/ITick'

export interface IMarketTicks { asArray: ITick[], asMap: { [date: string]: ITick } }

class MarketTicksStore {

    private store: { [marketName: string]: IMarketTicks }
    private marketNames: string[]

    constructor() {
        this.store = {}
        this.marketNames = []
    }

    public loadMarketTicks(marketNames: string[]): void {
        this.marketNames = marketNames

        this.marketNames.forEach((marketName) => {
            const ticksArray = require('./data/' + marketName + '.json') as ITick[]
            const tickMap: { [date: string]: ITick } = {}
            ticksArray.forEach((tick) => {
                tickMap[tick.time] = tick
            })
            this.store[marketName] = {
                asArray: ticksArray,
                asMap: tickMap,
            }
        })
    }

    public displayStoreInfo(): void {
        this.marketNames.forEach((marketName) => {
            console.log(this.store[marketName].asArray.length)
        })
    }

    public getMarket(marketName: string): IMarketTicks {
        return this.store[marketName]
    }

}

export const marketTickStore = new MarketTicksStore()
