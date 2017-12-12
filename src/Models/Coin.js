export default class Coin {

    constructor (coin) {
        this.id = coin.id
        this.name = coin.name
        this.symbol = coin.symbol
        this.rank = coin.rank
        this.priceUsd = coin.price_usd
        this.priceBtc = coin.price_btc
        this.dayVolumeUsd = coin["24h_volume_usd"]
        this.mktCapUsd = coin.market_cap_usd
        this.availSupply = coin.available_supply
        this.totalSupply = coin.total_supply
        this.pctChangeHour = coin.percent_change_1h
        this.pctChangeDay = coin.percent_change_24h
        this.pctChangeWeek = coin.percent_change_7d
        this.lastUpdated = coin.last_updated
        imageUrl = coin.ImageUrl
    }
    
}