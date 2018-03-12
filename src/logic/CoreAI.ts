
/**
 * @file Simulator
 * @author Jordane CURÉ
 */

import { Wallet } from '../mock/cryptoGate/Wallet'
import { MarketRecommendationService } from '../services/MarketRecommendation.service'
import { TickService } from '../services/Ticks.service'


class CoreAI {

    private wallet: Wallet = new Wallet(0)
    private ticksSliceSize: number = 1000 * 60 * 100

    public async startSimulation(): Promise<void> {

        this.wallet = new Wallet(1000)
        this.wallet.addCoin('')

        const simulationDate = await TickService.getFirstAndLastTickDate('')

        let currentDate = simulationDate.first + this.ticksSliceSize
        while (currentDate < simulationDate.last) {

            await this.doOneSimulationStep('', currentDate)

            currentDate += 1000 * 60
        }

        const lastTickPrice = await TickService.getLastTickPrice('')
        this.wallet.sellAllCoin('', lastTickPrice)
        this.wallet.logWallet()
    }

    private async doOneSimulationStep(marketName: string, date: number): Promise<void> {

        const ticks = await TickService.getTicks(marketName, date - this.ticksSliceSize, date)
        const recommendation = await MarketRecommendationService.getRecommendation(ticks)

        if (recommendation === 'sell') {
            this.wallet.sellAllCoin('', ticks[ticks.length - 1].close as number)
        }
        else if (recommendation === 'buy') {
            this.wallet.buyMaxCoin('', ticks[ticks.length - 1].close as number)
        }
    }
}

export const coreAI = new CoreAI()
