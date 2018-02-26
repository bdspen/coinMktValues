import { Config } from '../Config';

export default class RequestHelpers {

    parseCoins(coins) {
        coins = coins.map((coin) => new Coin(coin))
        return coins
    }

    reverseTranslateSymbolName(symbol) {
        return Object.keys(Config.translations).filter(sym => {
            return Config.translations[sym] = symbol;
        })[0];
    }

    translateSymbolName(sym) {
        if (Config.translations[sym])
            return Config.translations[sym]
        else return sym
    }

    translateSymbolNames(syms) {
        return syms.map(this.translateSymbolName)
    }
}