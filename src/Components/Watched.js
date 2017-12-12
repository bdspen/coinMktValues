import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import CoinList from './CoinList'
import { Networking } from '../Networking/networking'

export default class Watched extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coinList: []
        }
    }

    async componentDidMount() {
        const networking = new Networking()
        const coinList = await networking.getWatchedCoins()
        this.setState({
            isLoading: false,
            coinList: coinList,
        })

    }

    render() {
        return <CoinList coinList={this.state.coinList} navigation={this.props.navigation} />
    }
}