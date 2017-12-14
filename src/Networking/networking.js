import { Storage } from '../Storage/storage'
import { NetworkConfig } from './network-config'
import Coin from '../Models/Coin'
export class Networking {

    constructor() {
        this.networkConfig = new NetworkConfig()  
        this.storage = new Storage()      
    }

    parseCoins(coins) {
        coins = coins.map((coin) => new Coin(coin))
        return coins
    }

    // getCoinImage(imageUrl){
    //     const request  = new XMLHttpRequest()
    //     request.addEventListener("load", () => {
    //         console.log(request.responseText)
    //     })
    //     request.open("GET", imageUrl);
    //     request.send();
    // }

    getCoinList(limit) {
        const url = this.networkConfig.tickerUrl()
        return fetch(url)
        .then(res => res.json())
        .then(this.parseCoins)
    }

    async getWatchedCoins(coinIds) {

        if(!coinIds) coinIds = await this.storage.getWatchedCoins()

        return Promise.all(coinIds.map(coinId => {
            const url = this.networkConfig.tickerUrl(coinId)
            return fetch(url)
                .then(result => result.json())
                .then(this.parseCoins)
                .then(res => res[0])
        }))
    }

    getHistory(toTime, fromSymbol, toSymbol, limit) {
        return fetch(this.networkConfig.historyUrl(toTime, fromSymbol, toSymbol, limit))
        .then(result => {
            result = result.json()
            if (result.length === 0){
                console.log('retrying request...')
                this.getHistory(toTime, fromSymbol, toSymbol, limit)
            }
            else return result
        })
    }

    // async requestCoinData() {
    //     await this.getCoinList().subscribe(data => {
    //         const coins = data.map((coin) => new Coin(coin))
    //         this.storageService.setCoinResource(coins)
    //     })
    // }

}
