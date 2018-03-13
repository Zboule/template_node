

/**
 * @file	Entry point of the server
 * @author	Jordane CURÉ
 */

import { simulator } from './simulator/Simulator'
import { marketTickStore } from './ticks/MarketTicksStore'


const markets = ['ABC']

marketTickStore.loadMarketTicks(markets)

markets.forEach((marketName) => {
    simulator.doSimulation(marketName)
})

