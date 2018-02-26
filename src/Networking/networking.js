import { Storage } from '../Storage/storage'
import { NetworkConfig } from './network-config'
import { Config } from '../Config'
import Coin from '../Models/Coin'
import PriceMultiFull from '../Models/PriceMultiFull'
import RequestHelpers from './requestHelpers'
export class Networking {

    constructor() {
        this.networkConfig = new NetworkConfig()  
        this.storage = new Storage() 
        this.requestHelpers = new RequestHelpers()
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
        .then(this.reqestHelpers.parseCoins)
    }

    async getWatchedCoins(coinIds) {

        if(!coinIds) coinIds = await this.storage.getWatchedCoins()

        return Promise.all(coinIds.map(coinId => {
            const url = this.networkConfig.tickerUrl(coinId)
            return fetch(url)
                .then(result => result.json())
                .then(this.reqestHelpers.parseCoins)
                .then(res => res[0])
        }))
    }

    getAvailableMarkets(fromSymbol, toSymbol, sorted = true){
        return fetch(this.networkConfig.coinSnapshotUrl(this.requestHelpers.translateSymbolName(fromSymbol), toSymbol))
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

    priceMultiFull(fromSymbols, toSymbols, exchange){
        return fetch(this.networkConfig.priceMultiFullUrl(this.requestHelpers.translateSymbolNames(fromSymbols), toSymbols, exchange))
        .then(result => result.json())
        .then((result) => {

            // get coin in storage to merge with the response from pricemultifull
            this.storage.getCoins(fromSymbols)

            console.log(this.requestHelpers.translateSymbolNames(fromSymbols).map(fromSym => {
                return toSymbols.map(toSym => {
                    const response = new PriceMultiFull(result.RAW[fromSym][toSym]);

                })
            }))

            // return this.requestHelpers.translateSymbolNames(fromSymbols).map(fromSym => {
            //     return toSymbols.map(toSym => new PriceMultiFull(result.RAW[fromSym][toSym]))
            // })
        })
        .catch(err => {
            alert(err)
        });
    }

    getHistory(toTime, fromSymbol, toSymbol, limit, exchange) {
        return fetch(this.networkConfig.historyUrl(toTime, this.requestHelpers.translateSymbolName(fromSymbol), toSymbol, limit))
        .then(result => result.json())
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