
/**
 * @file Simulator
 * @author Jordane CURÉ
 */

import { IMarketAdviserConfig } from '../marketAI/IMarketAdviserConfig'
import { MarketAdviser } from '../marketAI/MarketAdviser'
import { CryptoPrice } from '../ticks/CryptoPrice'
import { minute } from '../utils/DateUtils'
import { Wallet } from '../wallet/Wallet'

export type SimulationFunction = (adviserConfig: IMarketAdviserConfig) => number

class Simulator {

    private numberOfTickForSimulation: number = 100


    public getSimulationFunction = (marketsName: string[]): SimulationFunction => {
        return (adviserConfig: IMarketAdviserConfig) => {
            return this.getSimulationResult(marketsName, adviserConfig)
        }
    }

    public getSimulationResult(marketsName: string[], adviserConfig: IMarketAdviserConfig): number {
        const wallets: Wallet[] = []

        marketsName.forEach((marketName) => {
            wallets.push(simulator.doMarketSimulation(marketName, adviserConfig))
        })


        let averageWin = 0
        wallets.forEach((wallet) => {
            // wallet.logWallet()
            averageWin += wallet.getWinPct()
        })

        return averageWin / wallets.length
    }

    public doMarketSimulation(marketName: string, adviserConfig: IMarketAdviserConfig): Wallet {
        const cryptoPrice = new CryptoPrice(marketName)
        const wallet = new Wallet(cryptoPrice, 1000, marketName)

        const youngestTick = cryptoPrice.getYoungestTick()
        const oldestTick = cryptoPrice.getOldestTick()

        let currentDate = oldestTick.time + (this.numberOfTickForSimulation * minute)

        let numberOfSimulationRemaning = (youngestTick.time - oldestTick.time) / minute

        while (currentDate < youngestTick.time) {

            cryptoPrice.setDate(currentDate)

            const ticks = cryptoPrice.getLastTicks(this.numberOfTickForSimulation)
            const recommendation = MarketAdviser.getRecommendation(ticks, adviserConfig)

            if (recommendation === 'sell') {
                wallet.sellAllCoin()
            }
            else if (recommendation === 'buy') {
                wallet.buyMaxCoin()
            }

            currentDate += minute
            numberOfSimulationRemaning--
            if (numberOfSimulationRemaning % 1000 === 0) {
                // console.log(marketName + ' - remaning simulation to process: ', numberOfSimulationRemaning)
            }
        }

        wallet.sellAllCoin()

        return wallet
    }
}

export const simulator = new Simulator()
