/**
 * @file MarketRecommendation.service
 * @author Jordane CURÉ
 */


import { ITick } from '../models/ITick'

export type Recommendation = 'sell' | 'buy' | 'none'

export class MarketRecommendationService {
    constructor() {
        // Empty constructor
    }

    public static getRecommendation(_ticks: ITick[]): Recommendation {
        return 'sell'
    }
}

