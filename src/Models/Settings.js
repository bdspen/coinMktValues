export default class Settings {

    // limitNumberOfCoins: 50,
    // disableSearchBar: false,
    // numberOfCandles: 14,
    // chartsAnimations: true,
    // navigationBarPosition: 'top',
    // navigationAnimations: true
    
    constructor ({

        limitNumberOfCoins = 50,
        disableSearchBar = false,
        numberOfCandles = 14,
        chartsAnimations = true,
        navigationBarPosition = 'top',
        navigationAnimations = true

    } = {}) {

        this._limitNumberOfCoins = limitNumberOfCoins
        this.disableSearchBar = disableSearchBar
        this._numberOfCandles = numberOfCandles
        this.chartsAnimations = chartsAnimations
        this._navigationBarPosition = navigationBarPosition
        this.navigationAnimations = navigationAnimations

    }

    get limitNumberOfCoins () {
        return this._limitNumberOfCoins
    }

    set limitNumberOfCoins (val) {
        if (val >= 1) {
            this._limitNumberOfCoins = val
        }
        else throw new Error("Value must be great than 1")
    }

    get numberOfCandles () {
        return this._numberOfCandles
    }

    set numberOfCandles (val) {
        if (val >= 1 && val <= 18){
            this._numberOfCandles = val
        }
        else throw new Error("Number of candles must be between 1 and 18")
    }

    get navigationBarPosition () {
        return this._navigationBarPosition
    }

    set navigationBarPosition (val) {
        if (val === 'top' || val === 'bottom'){
            this._navigationBarPosition = val
        }
        else throw new Error("value must be 'top' or 'bottom'")        
    }
    
}