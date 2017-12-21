
import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Picker } from 'react-native';
import { Networking } from '../Networking/networking'
import Loading from './Loading'

export default class SelectExchange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coin: props.navigation.state.params.coin,
            exchanges: [],
            selectedExchange: null
        }
    }

// {
//     close: 94.17
//     high: 94.3
//     low: 93.8
//     open: 94.23
//     time: 1511935380
//     volumefrom: 2769.55
//     volumeto: 261030.62
// }

    componentWillReceiveProps(nextProps) {
        this.setState({
            coin: nextProps.coin,
            selectedIndex: nextProps.selectedIndex
        }, this.fetchChartData)
    }
    

    componentDidMount() {
        this.networking = new Networking()
        this.fetchAvailableMarkets()
    }

    fetchAvailableMarkets() {
        this.networking.getAvailableMarkets(this.state.coin.symbol, 'USD')
        .then(exchangeInfoList => {
            this.setState({
                isLoading: false,
                exchanges: exchangeInfoList
            })
        })
    }

    renderPickerItems(){
        return this.state.exchanges.map((e, i) => {
            const price = parseFloat(e.price).toFixed(2)
            return <Picker.Item label={`${e.market} : $git${price}`} value={i} />                            
        })
    }

    render() {
        if (this.state.isLoading) return (
            <View style={{ flex: 1 }}>
                <Loading />
            </View>
        );

        return (
            <View style={{flex: 1}}>
                <Picker
                    style={{flex: 1}}
                    selectedValue={this.state.exchanges[0]}
                    onValueChange={(val, index) => this.setState({ selectedExchange: this.state.exchanges[index]})}>
                    { this.renderPickerItems() }
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
