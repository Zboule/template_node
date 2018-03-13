
/**
 * @file MarketRecommendation.service
 * @author Jordane CURÉ
 */

import { ITick } from '../ticks/models/ITick'
import { IMarketAdviserConfig } from './IMarketAdviserConfig'

export type Recommendation = 'sell' | 'buy' | 'wait'

export class MarketAdviser {

    private static lastAction: Recommendation = 'wait'


    public static getRecommendation(_ticks: ITick[], config: IMarketAdviserConfig): Recommendation {
        const action = Math.random()

        let recommendation: Recommendation
        if (action < config.aleaPct) {
            if (MarketAdviser.lastAction === 'sell' || MarketAdviser.lastAction === 'wait') {
                recommendation = 'buy'
                MarketAdviser.lastAction = 'buy'
            }
            else {
                recommendation = 'sell'
                MarketAdviser.lastAction = 'sell'
            }
        }
        else {
            recommendation = 'wait'
        }
        return recommendation
    }
}

