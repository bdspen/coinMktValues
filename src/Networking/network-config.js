import apiRoutes from './apiRoutes'
import QS from 'query-string'
export class NetworkConfig {

    constructor() { }

    coinListUrl() {
        return `${apiRoutes.CC.serverURL}${apiRoutes.CC.data}${apiRoutes.CC.coinList}`
    }
    
    tickerUrl(coinId, start, limit = 50) {


        let url = coinId ?
            `${apiRoutes.CMC.apiUrl}${apiRoutes.CMC.ticker}/${coinId}?` :
            `${apiRoutes.CMC.apiUrl}${apiRoutes.CMC.ticker}?`
        
        let qs = QS.stringify({start: start, limit: limit});
        return url + qs
    }

    // /data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG
    historyUrl(toTime, fromSymbol, toSymbol, limit = 20) {

        let url = `${apiRoutes.CC.apiUrl}${apiRoutes.CC.data}${apiRoutes.CC[toTime]}?`

        let qs = QS.stringify({
            fsym: fromSymbol,
            tsym: toSymbol,
            limit: limit,
            e: apiRoutes.CC.defaults.exchange
        });

        return url + qs                  
    }

}
    