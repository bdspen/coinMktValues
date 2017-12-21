import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native'
import { Icon, Card, ButtonGroup, Button } from 'react-native-elements'
import { Networking } from '../Networking/networking'
import PercentageChange from './PercentageChange'
import WatchButton from './WatchButton'
import { FormattedCurrency, FormattedNumber } from 'react-native-globalize'
import { Config } from '../Config'
import moment from 'moment';
import Chart from './Chart'
export default class CoinDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coin: props.navigation.state.params.coin,
            selectedIndex: 1        
        }
        this.updateIndex = this.updateIndex.bind(this)        
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {

        const buttons = ['Minutes', 'Hours', 'Days']

        return (
            <Card title={this.state.coin.name + ' (' + this.state.coin.symbol + ')'} containerStyle={{margin:0}} >
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
                        <FormattedNumber
                            value={parseInt(this.state.coin.dayVolumeUsd)}
                            style={{fontSize: 20}}
                        />
                        <Text style={{fontSize: 20}}> {this.state.coin.symbol}</Text>
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
                        <Button onPress={() => this.props.navigation.navigate('SelectExchange', {coin: this.state.coin})} title={'Select Exchange'}/>
                    </View>
                    <View style={styles.viewWrapper}>
                        <WatchButton coin={this.state.coin} />
                    </View>

                    {/* <View style={styles.viewWrapper}>
                        <PercentageChange coin={this.state.coin}/>
                    </View> */}
                    <View style={styles.viewWrapper}>
                        <Chart coin={this.state.coin} selectedIndex={this.state.selectedIndex}/>
                    </View>
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

