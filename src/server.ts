

/**
 * @file	Entry point of the server
 * @author	Jordane CURÉ
 */


import { geneticTrainer } from './genetic/GeneticTrainer'
import { IMarketAdviserConfig } from './marketAI/IMarketAdviserConfig'
import { simulator } from './simulator/Simulator'
import { marketTickStore } from './ticks/MarketTicksStore'


const markets = ['ABC', 'DEF']
marketTickStore.loadMarketTicks(markets)

const initialConfig: IMarketAdviserConfig = {
    aleaPct: 0.05,
}

// console.log(simulator.getSimulationResult(markets, initialConfig))


const simulationFunction = simulator.getSimulationFunction(markets)
geneticTrainer.startTraining(simulationFunction, initialConfig)
