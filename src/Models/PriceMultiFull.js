import RequestHelpers from '../Networking/requestHelpers'

export default class PriceMultiFull {

    requesthelpers = new RequestHelpers()

    constructor(response) {
        return {
            symbol: requesthelpers.reverseTranslateSymbolName(response.FROMSYMBOL),
            priceUsd: response.PRICE,
            priceBtc: response.PRICE,
            lastUpdated: response.LASTUPDATE,
            dayVolumeUsd: response.VOLUME24HOUR,
            pctChangeHour: response.CHANGEPCTDAY,
            pctChangeDay: response.CHANGEPCT24HOUR
        }
    }

}


// exchange = coin.MARKET
// symbol = coin.FROMSYMBOL
// priceUsd = coin.PRICE
// lastUpdated = coin.LASTUPDATE
// dayVolumeUsd = coin.VOLUME24HOUR
// mktCapUsd = coin.MKTCAP
// availSupply = coin.SUPPLY

// response from priceMultiFull
// {  
//     TYPE:"2",
//     MARKET:"Bitfinex",
//     FROMSYMBOL:"IOT",
//     TOSYMBOL:"USD",
//     FLAGS:"1",
//     PRICE:4.1162,
//     LASTUPDATE:1514369888,
//     LASTVOLUME:8.66428313,
//     LASTVOLUMETO:35.663922219705995,
//     LASTTRADEID:"143316213",
//     VOLUME24HOUR:27551977.135469686,
//     VOLUME24HOURTO:107052292.9144697,
//     OPEN24HOUR:3.5896,
//     HIGH24HOUR:4.34,
//     LOW24HOUR:3.5169,
//     CHANGE24HOUR:0.5266000000000002,
//     CHANGEPCT24HOUR:14.670158234900828,
//     CHANGEDAY:0,
//     CHANGEPCTDAY:0,
//     SUPPLY:2779530283,
//     MKTCAP:11441102550.8846,
//     TOTALVOLUME24H:59351211.457806095,
//     TOTALVOLUME24HTO:237944301.23207083
//  }