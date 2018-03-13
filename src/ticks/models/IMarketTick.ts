
/**
 * @file IMarketTick
 * @author Jordane CURÉ
 */

import { ITick } from './ITick'


export interface IMarketTicks {
    asArray: ITick[],
    asMap: {
        [date: string]: ITick
    }
}
