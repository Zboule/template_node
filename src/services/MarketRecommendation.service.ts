/**
 * @file MarketRecommendation.service
 * @author Jordane CURÉ
 */


import { ITick } from '../models/ITick'

export type Recommendation = 'sell' | 'buy' | 'wait'

export class MarketRecommendationService {

    private static lastAction: Recommendation = 'wait'
    constructor() {
        // Empty constructor
    }

    public static getRecommendation(_ticks: ITick[]): Promise<Recommendation> {
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
        return Promise.resolve(recommendation)
    }
}

