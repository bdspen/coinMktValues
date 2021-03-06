import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Networking } from '../Networking/networking'
import CoinList from './CoinList'

export default class All extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coinList: []
        }
        this.getCoinList = this.getCoinList.bind(this)                
    }

    async componentDidMount() {
        this.getCoinList()
    }

    async getCoinList(){
        const networking = new Networking()        
        const coinList = await networking.getCoinList()
        this.setState({
            isLoading: false,
            coinList: coinList,
        })
    }

    render() {
        return <CoinList coinList={this.state.coinList} refreshFunction={this.getCoinList} navigation={this.props.navigation} />
    }
}