import { AsyncStorage } from 'react-native'
import { Config } from '../Config'

export const Stores = {
    coinResource : "coinResource",
    watched : "watched"
}

export class Storage {

    storage = AsyncStorage

    constructor() { }

    setWatchedCoins(value) {
        return this.storage.setItem(Stores.watched, value)
    }

    async hasData(store) {
        const keys = await this.storage.getAllKeys()
        console.log(keys)
    }

    async getWatchedCoins() {
        let watchedCoins = await this.storage.getItem(Stores.watched)
        if(!watchedCoins) watchedCoins = Config.defaultWatchListCoins
        return watchedCoins
    }

    setCoinResource(value) {
        this.storage.clear()
        return this.storage.setItem(Stores.coinResource, value)
    }

    getCoinResource() {
        return this.storage.get(Stores.coinResource)
    }

    updateSelectedCoins(coins, resource) {
        coins.forEach((coin, i) => {
            resource.forEach((resourceCoin, j) => {
                if (coin.id === resourceCoin.id) {
                    coins[i] = Object.assign(coins[i], resource[j])
                }
            })
        })
        return coins
    }

}
