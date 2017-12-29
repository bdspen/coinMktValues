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

    coinSnapshotUrl(fromSymbol, toSymbol){
        let url = `${apiRoutes.CC.serverUrl}${apiRoutes.CC.apiParam}${apiRoutes.CC.data}${apiRoutes.CC.coinSnapshot}?`
        let qs = QS.stringify({
            fsym: fromSymbol,
            tsym: toSymbol,
        });

        return url + qs
    }

    // https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH,DASH&tsyms=BTC,USD,EUR
    priceMultiFullUrl(fromSymbols, toSymbols = ['USD', 'BTC'], exchange){
        let url = `${apiRoutes.CC.apiUrl}${apiRoutes.CC.data}${apiRoutes.CC.priceMultiFull}?`

        let qs = QS.stringify({
            fsyms: fromSymbol,
            tsyms: toSymbol,
            e: exchange
        });

        return url + qs 
    }

    // /data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG
    historyUrl(toTime, fromSymbol, toSymbol, limit = 20, exchange = apiRoutes.CC.defaults.exchange) {

        let url = `${apiRoutes.CC.apiUrl}${apiRoutes.CC.data}${apiRoutes.CC[toTime]}?`

        let qs = QS.stringify({
            fsym: fromSymbol,
            tsym: toSymbol,
            limit: limit,
            e: exchange
        });

        return url + qs                  
    }

}
    