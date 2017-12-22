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

    getAvailableMarkets(fromSymbol, toSymbol, sorted = true){
        return fetch(this.networkConfig.coinSnapshotUrl(fromSymbol, toSymbol))
        .then((result) => result.json())
        .then(({Data}) => {
            if (!sorted) return Data.Exchanges.map(this._extractExchangeInfo)
            return Data.Exchanges.sort((e, eLast) => {
                return eLast.VOLUME24HOUR - e.VOLUME24HOUR
            })
            .filter(e => parseInt(e.VOLUME24HOUR))
            .map(this._extractExchangeInfo)
        })
    }

    priceMultiFull(fromSymbol, toSymbol, exchange){
        return fetch(this.networkConfig.priceMultiFullUrl(fromSymbol, toSymbol, exchange))
        .then(result => result.json())
        .then(({Raw}) => Raw[fromSymbol][toSymbol])
    }

    getHistory(toTime, fromSymbol, toSymbol, limit, exchange) {
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

    _extractExchangeInfo({MARKET, PRICE, LASTUPDATE }){
        return {
            market: MARKET,
            price: PRICE,
            lastUpdated: LASTUPDATE
        }
    }

    // async requestCoinData() {
    //     await this.getCoinList().subscribe(data => {
    //         const coins = data.map((coin) => new Coin(coin))
    //         this.storageService.setCoinResource(coins)
    //     })
    // }

}
