export default apiRoutes = {

    //cryptocompare api
    CC: {
        serverUrl: 'https://www.cryptocompare.com',
        apiUrl: 'https://min-api.cryptocompare.com',
        data: '/data',
        all: '/all',
        price: '/price',
        coinSnapshot: '/coinSnapshot',
        media: '/media', //https://www.cryptocompare.com/media/19782/litecoin-logo.png        
        coinList: '/coinlist',
        toMinute: '/histominute',
        toHour: '/histohour',
        toDay: '/histoday',
        defaults: {
            exchange: 'CCCAGG'
        },
    },

    // coinmarketcap api
    CMC: {
        apiUrl: 'https://api.coinmarketcap.com/v1',
        ticker: '/ticker'
    }
}