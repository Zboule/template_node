/**
 * @file TicksLoader
 * @author Jordane CURÉ
 */

import { GetTicks } from '../mock/cryptoPrice/GetTicks'
import { ITick } from '../models/ITick'

export class TickService {

    public static getLastTickPrice(marketName: string): Promise<number> {
        return GetTicks.getLastTick(marketName).then((tick) => tick.close as number)
    }

    public static getLastTickDate(marketName: string): Promise<number> {
        return GetTicks.getLastTick(marketName).then((tick) => tick.time)
    }

    public static getFirstTickDate(marketName: string): Promise<number> {
        return GetTicks.getFirstTick(marketName).then((tick) => tick.time)
    }

    public static getTicks(marketName: string, startDate: number, endDate: number): Promise<ITick[]> {
        return GetTicks.getTicks(marketName, startDate, endDate)
    }

    public static getFirstAndLastTickDate(marketName: string): Promise<{ first: number, last: number }> {
        return this.getFirstTickDate(marketName)
            .then((firstTickDate) => {
                return this.getLastTickDate(marketName)
                    .then((lastTickDate) => {
                        return {
                            first: firstTickDate,
                            last: lastTickDate,
                        }
                    })
            })
    }
}
