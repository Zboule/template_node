/**
 * @file TicksLoader
 * @author Jordane CURÉ
 */

import { ITick } from '../../models/ITick'
import { ticksArray, tickMap } from './tick.mock'

export class GetTicks {

    private static tickMap: { [date: string]: ITick } = tickMap
    private static tickArray: ITick[] = ticksArray


    public static getLastTick(_marketName: string): Promise<ITick> {
        return new Promise((resolve) => {
            resolve(this.tickArray[this.tickArray.length - 1])
        })
    }

    public static getFirstTick(_marketName: string): Promise<ITick> {
        return new Promise((resolve) => {
            resolve(this.tickArray[0])
        })
    }

    public static getTicks(marketName: string, startDate: number, endDate: number): Promise<ITick[]> {

        const ticksMinutes = this.generateTicksMinutes(startDate, endDate)

        const ticksPromises: Promise<ITick>[] = []
        ticksMinutes.forEach((tickMinute) => {
            ticksPromises.push(this.getTick(marketName, tickMinute))
        })

        return Promise.all(ticksPromises)
            .then((ticks) => {
                return ticks
            })
    }


    private static getTick(_marketName: string, date: number): Promise<ITick> {
        return new Promise((resolve, _reject) => {
            let tick = this.tickMap[date]
            if (!tick) {
                tick = { time: date }
            }
            resolve(tick)
        })
    }

    private static generateTicksMinutes(startDate: number, endDate: number): number[] {
        const tickMinutes = []
        while (startDate <= endDate) {
            tickMinutes.push(startDate)
            startDate += 60000
        }
        return tickMinutes
    }

}
