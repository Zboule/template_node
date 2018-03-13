/**
 * @file	class Tick
 * @author	Alexis CURÉ
 */

export interface ITick {
    open?: number,
    high?: number,
    low?: number,
    close?: number,
    volume?: number,
    time: number,
    baseVolume?: number,
    // specificbinance
    numberOfTrade?: number,
    takerBuyVolume?: number,
    takerBuyBaseVolume?: number,
    // realTimeBittrex
    last?: number,
    ask?: number,
    bid?: number
}
