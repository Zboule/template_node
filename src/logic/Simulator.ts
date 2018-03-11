
/**
 * @file Simulator
 * @author Jordane CURÉ
 */

import { weekInMs } from '../services/Date.service'
import { MarketRecommendationService } from '../services/MarketRecommendation.service'
import { TickService } from '../services/Ticks.service'
import { Wallet } from './Wallet'


class Simulator {

    public startSimulation(): void {

        console.log('Simulation start')

        const wallet = new Wallet(1000)
        wallet.addCoin('')

        const ticksSize = weekInMs

        const simulationDate = TickService.getFirstTickDate() + ticksSize
        const endDate = TickService.getLastTickDate()

        while (simulationDate < endDate) {
            const ticks = TickService.getTicks('', simulationDate - ticksSize, simulationDate)

            const recommendation = MarketRecommendationService.getRecommendation(ticks)

            if (recommendation === 'sell') {
                wallet.sellAllCoin('', ticks[ticks.length - 1].close)
            }
            else if (recommendation === 'buy') {
                wallet.buyMaxCoin('', ticks[ticks.length - 1].close)
            }
        }

        console.log('Simulation end')
        console.log('Wallet: ', wallet)
    }
}

export const simulator = new Simulator()
