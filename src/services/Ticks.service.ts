/**
 * @file TicksLoader
 * @author Jordane CURÉ
 */

import { ITick } from '../models/ITick'

export class TickService {

    public static getLastTickDate(): number {
        return 0
    }

    public static getFirstTickDate(): number {
        return 0
    }

    public static getTicks(_coinName: string, _startDate: number, _endDate: number): ITick[] {
        return []
    }

}
