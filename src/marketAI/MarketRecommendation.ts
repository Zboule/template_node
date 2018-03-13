
/**
 * @file MarketRecommendation.service
 * @author Jordane CURÉ
 */

import { ITick } from '../ticks/models/ITick'

export type Recommendation = 'sell' | 'buy' | 'wait'

export class MarketRecommendation {

    private static lastAction: Recommendation = 'wait'


    public static getRecommendation(_ticks: ITick[]): Recommendation {
        const action = Math.random()

        let recommendation: Recommendation
        if (action < 0.005) {
            if (this.lastAction === 'sell' || this.lastAction === 'wait') {
                recommendation = 'buy'
                this.lastAction = 'buy'
            }
            else {
                recommendation = 'sell'
                this.lastAction = 'sell'
            }
        }
        else {
            recommendation = 'wait'
        }
        return recommendation
    }
}

