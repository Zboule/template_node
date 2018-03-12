/**
 * @file Wallet
 * @author Jordane CURÉ
 */

interface IWalletState {
    cash: number,
    ownedCoins: { [coinName: string]: number }
}

export class Wallet {
    private state: IWalletState
    private history: IWalletState[]
    private transactionFee: number = 0.999

    constructor(cash: number) {
        this.state = {
            cash,
            ownedCoins: {},
        }
        this.history = [this.state]
    }

    public getCoinsValue(coinName: string): number {
        return this.state.ownedCoins[coinName]
    }

    public buyMaxCoin(coinName: string, coinPrice: number): void {
        this.buyCoin(coinName, this.state.cash, coinPrice)
    }

    public buyCoin(coinName: string, amoutOfCashToSpend: number, coinPrice: number): void {
        if (amoutOfCashToSpend > this.state.cash) {
            throw new Error('Not enougth cash to buy coin')
        }
        else {
            const newState = {
                cash: this.state.cash,
                ownedCoins: { ...this.state.ownedCoins },
            }
            newState.cash = this.state.cash - amoutOfCashToSpend
            newState.ownedCoins[coinName] = this.state.ownedCoins[coinName] + ((amoutOfCashToSpend * this.transactionFee) / coinPrice)
            this.state = newState
            this.history.push(this.state)
        }
    }

    public sellAllCoin(coinName: string, coinPrice: number): void {
        this.sellCoin(coinName, this.state.ownedCoins[coinName], coinPrice)
    }

    public sellCoin(coinName: string, nbOfCoin: number, coinPrice: number): void {

        if (this.state.ownedCoins[coinName] < nbOfCoin) {
            throw new Error('Try to sell negative number of coins')
        }
        else {
            const newState = {
                cash: this.state.cash,
                ownedCoins: { ...this.state.ownedCoins },
            }
            newState.cash = this.state.cash + nbOfCoin * coinPrice * this.transactionFee
            newState.ownedCoins[coinName] = this.state.ownedCoins[coinName] - nbOfCoin
            this.state = newState
            this.history.push(this.state)
        }
    }

    public addCoin(coinName: string): void {
        this.state.ownedCoins[coinName] = 0
    }

    public logHistory = (): void => {
        this.history.forEach((state) => {
            console.log('History state: ' + Math.floor(state.cash) + ' - ' + Math.floor(state.ownedCoins['']))
        })
    }

    public logWallet = (): void => {
        console.log('Cash: ' + Math.floor(this.state.cash) + ' with ' + this.history.length + ' transactions')
    }
}
