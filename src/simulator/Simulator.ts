
/**
 * @file Simulator
 * @author Jordane CURÉ
 */

import { MarketRecommendation } from '../marketAI/MarketRecommendation'
import { CryptoPrice } from '../ticks/CryptoPrice'
import { minute } from '../utils/DateUtils'
import { Wallet } from '../wallet/Wallet'


class Simulator {

    private numberOfTickForSimulation: number = 100


    public doSimulation(marketName: string): Wallet {
        const cryptoPrice = new CryptoPrice(marketName)
        const wallet = new Wallet(cryptoPrice, 1000, marketName)

        const youngestTick = cryptoPrice.getYoungestTick()
        const oldestTick = cryptoPrice.getOldestTick()

        let currentDate = oldestTick.time + (this.numberOfTickForSimulation * minute)

        let numberOfSimulationRemaning = (youngestTick.time - oldestTick.time) / minute

        while (currentDate < youngestTick.time) {

            cryptoPrice.setDate(currentDate)

            const ticks = cryptoPrice.getLastTicks(this.numberOfTickForSimulation)
            const recommendation = MarketRecommendation.getRecommendation(ticks)

            if (recommendation === 'sell') {
                wallet.sellAllCoin()
            }
            else if (recommendation === 'buy') {
                wallet.buyMaxCoin()
            }

            currentDate += minute
            numberOfSimulationRemaning--
            if (numberOfSimulationRemaning % 1000 === 0) {
                console.log(marketName + ' - remaning simulation to process: ', numberOfSimulationRemaning)
            }
        }

        wallet.sellAllCoin()

        return wallet
    }
}

export const simulator = new Simulator()
