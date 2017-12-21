
import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Networking } from '../Networking/networking'
import Loading from './Loading'

export default class SelectExchange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coin: props.navigation.state.params.coin,
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
        .then(result => {
            this.setState({isLoading: false})
        })
    }

    render() {
        if (this.state.isLoading) return (
            <View style={{ flex: 1 }}>
                <Loading />
            </View>
        );

        return (
            <View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
