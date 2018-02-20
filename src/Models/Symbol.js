// export default class Symbol {

//     constructor(symbol) {
//         this.name = symbol.name
//     }

//     get() {
//         return this.name
//     }

//     translated() {
//         if (Config.translations[this.symbol])
//             this.symbol = Config.translations[this.symbol]
//     }

//     static reverseTranslateSymbolName(symbol) {
//         return Object.keys(Config.translations).filter(sym => {
//             return Config.translations[sym] = symbol;
//         })[0];
//     }

//     static translateSymbolName(sym) {
//         if (Config.translations[sym])
//             return Config.translations[sym]
//         else return sym
//     }

//     static translateSymbolNames(syms) {
//         return syms.map(this.translateSymbolName)
//     }

// }