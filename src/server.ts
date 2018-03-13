

/**
 * @file	Entry point of the server
 * @author	Jordane CURÉ
 */

import { simulator } from './simulator/Simulator'
import { marketTickStore } from './ticks/MarketTicksStore'
import { Wallet } from './wallet/Wallet'


const markets = ['ABC', 'DEF']

marketTickStore.loadMarketTicks(markets)


const wallets: Wallet[] = markets.map((marketName) => {
    return simulator.doSimulation(marketName)
})

wallets.forEach((wallet) => {
    wallet.logWallet()
})

