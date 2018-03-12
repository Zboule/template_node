
// /**
//  * @file Ordonnancer
//  * @author Jordane CURÉ
//  */

// import { TickService } from '../services/Ticks.service'

// export class Ordonnancer {

//     private ticksSliceSize: number = 1000 * 60 * 100
//     private simulationFunction

//     constructor(tickSliceSize: number, simulationFunction: (marketName: string, date: number) => Promise<void>) {
//         this.ticksSliceSize = tickSliceSize
//     }

//     public async start(): Promise<void> {

//         const simulationDate = await TickService.getFirstAndLastTickDate('')

//         let currentDate = simulationDate.first + this.ticksSliceSize
//         while (currentDate < simulationDate.last) {

//             await Simulator.doOneSimulationStep('', currentDate)

//             currentDate += 1000 * 60
//         }

//         const lastTickPrice = await TickService.getLastTickPrice('')
//         this.wallet.sellAllCoin('', lastTickPrice)
//         this.wallet.logWallet()
//     }

// }
