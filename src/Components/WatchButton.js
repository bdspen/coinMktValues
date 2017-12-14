import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Alert } from 'react-native';
import { Storage } from '../Storage/storage'
import { Button } from 'react-native-elements'
import { Config } from '../Config'

export default class WatchButton extends Component {

    watchedList = []
    storage = null
    
    constructor(props) {
        super(props);
        this.state = {
            isWatched: false,
            coin: props.coin,
            add: true
        }
        this.storage = new Storage()
        this.addToWatched = this.addToWatched.bind(this);
        this.removeFromWatched = this.removeFromWatched.bind(this);
    }

    async componentDidMount() {
        this.watchedList = await this.storage.getWatchedCoins()
        this.setState({
            isWatched: (this.watchedList.indexOf(this.state.coin.id) >= 0)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            coin: nextProps.coin,
        })
    }

    addToWatched () {
        this.storage.pushWatchedCoin(this.state.coin.id)
            .then(() => {
                Alert.alert(`${this.state.coin.name} added to watch list.`)
                this.setState({
                    isWatched: true
                })
            })
            .catch(err => Alert.alert('Error', err.message))
        
    }

    removeFromWatched () {
        this.storage.removeWatchedCoin(this.state.coin.id)
            .then(() => {
                Alert.alert(`${this.state.coin.name} removed from watch list.`)
                this.setState({
                    isWatched: false
                })
            })
            .catch(err => Alert.alert('Error', err.message))
        
    }

    render() {

            if (!this.state.isWatched) return (
                <Button
                    color={Config.colors.defaultBlue}
                    backgroundColor="white"
                    icon={{name: 'eye', type: 'font-awesome', color: Config.colors.defaultBlue}}
                    title='ADD TO WATCHED'
                    onPress={this.addToWatched}
                />
            )

            else return (
                <Button
                    color={Config.colors.negativeRed}
                    backgroundColor="white"
                    icon={{name: 'eye', type: 'font-awesome', color: Config.colors.negativeRed}}
                    title='REMOVE FROM WATCHED'
                    onPress={this.removeFromWatched}
                />
            )
    }
}