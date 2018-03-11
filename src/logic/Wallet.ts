/**
 * @file Wallet
 * @author Jordane CURÉ
 */


export class Wallet {

    private cash: number

    private ownedCoins: { [coinName: string]: number }

    constructor(cash: number) {
        this.cash = cash
        this.ownedCoins = {}
    }

    public getCoinsValue(coinName: string): number {
        return this.ownedCoins[coinName]
    }

    public buyMaxCoin(coinName: string, coinPrice: number): void {
        this.buyCoin(coinName, this.cash, coinPrice)
    }


    public buyCoin(coinName: string, amoutOfCashToSpend: number, coinPrice: number): void {
        if (amoutOfCashToSpend > this.cash) {
            throw new Error('Not enougth cash to buy coin')
        }
        else {

            this.ownedCoins[coinName] += amoutOfCashToSpend / coinPrice
            this.cash -= amoutOfCashToSpend
        }
    }

    public sellAllCoin(coinName: string, coinPrice: number): void {
        this.sellCoin(coinName, this.ownedCoins[coinName], coinPrice)
    }

    public sellCoin(coinName: string, nbOfCoin: number, coinPrice: number): void {

        if (this.ownedCoins[coinName] < nbOfCoin) {
            throw new Error('Try to sell negative number of coins')
        }
        else {
            this.ownedCoins[coinName] -= nbOfCoin
            this.cash += nbOfCoin * coinPrice
        }
    }

    public addCoin(coinName: string): void {
        this.ownedCoins[coinName] = 0
    }

}
