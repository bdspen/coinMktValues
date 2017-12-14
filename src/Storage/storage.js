import { AsyncStorage } from 'react-native'
import { Config } from '../Config'

export const Stores = {
    coinResource : "coinResource",
    watched : "watched"
}

export class Storage {

    constructor() { }

    setWatchedCoins(value) {
        return AsyncStorage.setItem(Stores.watched, JSON.stringify(value))
    }

    async pushWatchedCoin(id){
        const watched = await this.getWatchedCoins()
        if (watched.indexOf(id) >= 0) throw new Error("This item is already in the watch list.")
        watched.push(id)
        return AsyncStorage.setItem(Stores.watched, JSON.stringify(watched))
    }

    async removeWatchedCoin(id){
        const watched = await this.getWatchedCoins()
        const index = watched.indexOf(id)
        if (index < 0) throw new Error("This item is not in the watch list.")
        watched.splice(index, 1)
        return AsyncStorage.setItem(Stores.watched, JSON.stringify(watched))
    }

    async hasData(store) {
        const keys = await AsyncStorage.getAllKeys()
        console.log(keys)
    }

    async getWatchedCoins() {

        let watchedCoins = await AsyncStorage.getItem(Stores.watched)
        if(!watchedCoins) {
            return this.setWatchedCoins(Config.defaultWatchListCoins)
            .then(() => this.getWatchedCoins())
        }

        watchedCoins = JSON.parse(watchedCoins)
        if (!Array.isArray(watchedCoins)) watchedCoins = [watchedCoins]
        return watchedCoins
    }

    setCoinResource(value) {
        return AsyncStorage.setItem(Stores.coinResource, value)
    }

    getCoinResource() {
        return AsyncStorage.get(Stores.coinResource)
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
