
/**
 * @file Wallet
 * @author Jordane CURÉ
 */

import { CryptoPrice } from '../ticks/CryptoPrice'


interface IWalletState {
    cash: number,
    ownedCoins: number
}

export class Wallet {
    private state: IWalletState
    private history: IWalletState[]
    private transactionFee: number = 0.999

    constructor(private cryptoPrice: CryptoPrice, initialCash: number) {
        this.state = {
            cash: initialCash,
            ownedCoins: 0,
        }
        this.history = [this.state]
    }

    public getCoinsValue(): number {
        return this.state.ownedCoins
    }

    public async buyMaxCoin(): Promise<void> {
        this.buyCoin(this.state.cash)
    }

    public async buyCoin(amoutOfCashToSpend: number): Promise<void> {
        if (amoutOfCashToSpend > this.state.cash) {
            throw new Error('Not enougth cash to buy coin')
        }
        else {
            const coinPrice = this.cryptoPrice.getLastTick().close as number

            const newState = {
                cash: this.state.cash,
                ownedCoins: this.state.ownedCoins,
            }
            newState.cash = this.state.cash - amoutOfCashToSpend
            newState.ownedCoins = this.state.ownedCoins + ((amoutOfCashToSpend * this.transactionFee) / coinPrice)
            this.state = newState
            this.history.push(this.state)
        }
    }

    public sellAllCoin(): void {
        this.sellCoin(this.state.ownedCoins)
    }

    public async sellCoin(nbOfCoin: number): Promise<void> {

        if (this.state.ownedCoins < nbOfCoin) {
            throw new Error('Try to sell negative number of coins')
        }
        else {
            const coinPrice = this.cryptoPrice.getLastTick().close as number

            const newState = {
                cash: this.state.cash,
                ownedCoins: this.state.ownedCoins,
            }
            newState.cash = this.state.cash + nbOfCoin * coinPrice * this.transactionFee
            newState.ownedCoins = this.state.ownedCoins - nbOfCoin
            this.state = newState
            this.history.push(this.state)
        }
    }

    public logHistory = (): void => {
        this.history.forEach((state) => {
            console.log('History state: ' + Math.floor(state.cash) + ' - ' + Math.floor(state.ownedCoins))
        })
    }

    public logWallet = (): void => {
        console.log('Cash: ' + Math.floor(this.state.cash) + ' with ' + this.history.length + ' transactions')
    }


}

