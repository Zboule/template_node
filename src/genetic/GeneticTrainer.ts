/**
 * @file GeneticTrainer
 * @author Jordane CURÉ
 */

import { IMarketAdviserConfig } from '../marketAI/IMarketAdviserConfig'
import { SimulationFunction } from '../simulator/Simulator'


type IGeneticPool = { result: number, config: IMarketAdviserConfig }[]

class GeneticTrainer {


    public startTraining(simulationFunction: SimulationFunction, initialConfig: IMarketAdviserConfig): void {
        let pool: IGeneticPool = this.generateInitialPool(initialConfig)

        for (let i = 0; i < 1000; i++) {
            this.addPoolResult(simulationFunction, pool)
            this.logPoolResult(pool)
            pool = this.makePoolMutation(pool)

        }
    }

    private generateInitialPool = (initialConfig: IMarketAdviserConfig): IGeneticPool => {

        const pool: IGeneticPool = []

        pool.push({
            result: 0,
            config: initialConfig,
        })

        for (let i = 0; i < 19; i++) {
            pool.push({
                result: 0,
                config: this.mutateConfig(initialConfig),
            })
        }
        return pool
    }

    private addPoolResult = (simulationFunction: SimulationFunction, geneticPool: IGeneticPool): void => {
        geneticPool.forEach((gene) => {
            gene.result = simulationFunction(gene.config)
        })
    }

    private logPoolResult = (geneticPool: IGeneticPool): void => {
        const sortedPool = this.sortPool(geneticPool)
        const topGene = sortedPool[0]
        console.log('Best gene with result of ' + topGene.result + ' - with config: ', topGene.config)
    }

    private makePoolMutation = (geneticPool: IGeneticPool): IGeneticPool => {

        const sortedPool = this.sortPool(geneticPool)
        const topGenes = sortedPool.slice(0, 4)
        const newPool: IGeneticPool = []

        topGenes.forEach((gene) => {
            newPool.push({
                result: 0,
                config: gene.config,
            })
            for (let i = 0; i < 4; i++) {
                newPool.push({
                    result: 0,
                    config: this.mutateConfig(gene.config),
                })
            }
        })
        return newPool
    }

    private sortPool = (geneticPool: IGeneticPool): IGeneticPool => {
        return geneticPool.sort((a, b) => b.result - a.result)
    }

    private mutateConfig = (initialConfig: IMarketAdviserConfig): IMarketAdviserConfig => {
        const newConfig: any = { ...initialConfig }

        const configKey = Object.keys(newConfig)

        configKey.forEach((key) => {
            newConfig[key] = this.mutateValue(newConfig[key])
        })

        return newConfig
    }

    private mutateValue = (value: number): number => {
        const randomMutationCoef = 0.9 + (Math.random() / 5)
        return value * randomMutationCoef
    }

}

export const geneticTrainer = new GeneticTrainer()
