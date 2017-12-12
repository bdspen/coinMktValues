import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View, Button } from 'react-native';
import { Icon, Card, ButtonGroup } from 'react-native-elements'
import { Networking } from '../Networking/networking'
import { Storage } from '../Storage/storage'
import moment from 'moment';
import Chart from './Chart'
export default class CoinDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coin: props.navigation.state.params.coin,
            isWatched: true,
            selectedIndex: 1            
        }
        this.updateIndex = this.updateIndex.bind(this)                
    }

    async componentDidMount() {
        const storage = new Storage()
        const watchedList = await storage.getWatchedCoins()
        const isWatched = watchedList.indexOf(this.state.coin.id) >= 0
        this.setState({
            isWatched: isWatched
        })
        console.log(this.state.isWatched)

    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {

        const buttons = ['Minute', 'Hour', 'Day']

        return (
            <Card title={this.state.coin.name + ' (' + this.state.coin.symbol + ')'} >
                <View style={styles.column}>
                    <View style={styles.viewWrapper}>
                        <Icon name="dollar" type= 'font-awesome' size={20} />
                        <Text style={{fontSize: 20}}> {this.state.coin.priceUsd}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Icon name="bitcoin" type= 'font-awesome' size={20} />
                        <Text style={{fontSize: 20}}> {this.state.coin.priceBtc}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Icon name="bar-graph" type= 'entypo' size={20} />
                        <Text style={{fontSize: 20}}> {this.state.coin.dayVolumeUsd}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={buttons}
                            containerStyle={{height: 20, flex: 1}}
                        />
                    </View>
                    <View style={styles.viewWrapper}>
                        <Chart coin={this.state.coin} selectedIndex={this.state.selectedIndex}/>
                    </View>
                    {
                        !this.state.isWatched &&
                        <Button
                            large
                            backgroundColor='black'
                            icon={{name: 'envira', type: 'font-awesome'}}
                            title='ADD TO WATCHED'
                        />
                    }
                    <Text>Last Updated: {
                        moment((this.state.coin.lastUpdated * 1000)).format('h:mm')
                    }</Text>
                </View>

            </Card>
        );
    }
}

const styles = StyleSheet.create({
    viewWrapper: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    column: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

