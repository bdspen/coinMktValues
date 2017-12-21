import { AsyncStorage } from 'react-native'
import { Config } from '../Config'
import Settings from '../Models/Settings'

export const Stores = {
    coinResource : "coinResource",
    watched : "watched",
    settings: "settings"
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

        if(watchedCoins) watchedCoins = JSON.parse(watchedCoins)        
        if(!watchedCoins.length) {
            return this.setWatchedCoins(Config.defaultWatchListCoins)
            .then(() => this.getWatchedCoins())
        }

        if (!Array.isArray(watchedCoins)) watchedCoins = [watchedCoins]
        return watchedCoins
    }

    getCoinResource() {
        return AsyncStorage.get(Stores.coinResource)
    }

    setCoinResource(value) {
        return AsyncStorage.setItem(Stores.coinResource, value)
    }

    getSettings(){
        return AsyncStorage.getItem(Stores.settings)
            .then(settings => {
                if(!settings) this.setSettings(new Settings())
                    .then(() => this.getSettings())
                else {
                    try{
                        const s = JSON.parse(settings)
                        return new Settings(s)
                    }
                    catch(e) { throw new Error(e) }
                }
            })
    }

    setSettings(newSettings){
        newSettings = new Settings(newSettings)
        return AsyncStorage.setItem(Stores.settings, JSON.stringify(newSettings))
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
