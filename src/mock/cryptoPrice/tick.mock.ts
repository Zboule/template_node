
/**
 * @file tick.mock
 * @author Jordane CURÉ
 */

import { ITick } from '../../models/ITick'

export const ticksArray = require('./jsonTicks.json') as ITick[]


const _tickMap: { [date: string]: ITick } = {}

ticksArray.forEach((tick) => {
    _tickMap[tick.time] = tick
})

export const tickMap = _tickMap
