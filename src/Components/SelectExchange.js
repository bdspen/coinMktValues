
import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Picker } from 'react-native';
import { Networking } from '../Networking/networking'
import Loading from './Loading'
import { Button } from 'react-native-elements';
import { Config } from '../Config'

export default class SelectExchange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coin: props.coin,
            exchanges: [],
            selectedExchangeIndex: null
        }
        this.selectExchange = props.selectExchange
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
            return <Picker.Item label={`${e.market} : $${price}`} key={i} value={i} />                            
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
                    selectedValue={this.state.selectedExchangeIndex}
                    onValueChange={(val, index) => this.setState({ selectedExchangeIndex: index})}>
                    { this.renderPickerItems() }
                </Picker>
                <Button onPress={this.selectExchange} title={'Select'} color={Config.colors.defaultBlue} backgroundColor={'white'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
