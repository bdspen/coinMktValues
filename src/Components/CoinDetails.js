import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View, ScrollView } from 'react-native'
import { Icon, Card, ButtonGroup, Button } from 'react-native-elements'
import { Networking } from '../Networking/networking'
import PercentageChange from './PercentageChange'
import WatchButton from './WatchButton'
import SelectExchange from './SelectExchange'
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
            selectedIndex: 1        ,
            modal: false
        }
        this.networking = new Networking()
        this.updateIndex = this.updateIndex.bind(this)   
        this.selectExchange = this.selectExchange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)        
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    toggleModal(){
        this.setState({modal: !this.state.modal})
    }

    updateCoin(exchange){
        this.networking.priceMultiFull(this.state.coin.symbol, 'USD', exchange)
    }

    selectExchange(exchange){
        // (this.state.exchanges[this.state.selectedExchangeIndex])
        //must pass exchange from the child to here.
        Promise.all([this.toggleModal(), this.updateCoin(exchange)])
        .then(([toggle, coin]) => {
            this.setState({coin: coin})
        })
    }

    render() {

        const buttons = ['Minutes', 'Hours', 'Days']

        return (
            <ScrollView>
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
                    {
                        !this.state.modal && <View style={styles.viewWrapper}>
                            <Button onPress={this.toggleModal} title={'Select Exchange'} color={Config.colors.defaultBlue} backgroundColor={'white'}/>
                        </View>
                    }
                    <View style={styles.viewWrapper}>
                        <WatchButton coin={this.state.coin} />
                    </View>

                    {/* <View style={styles.viewWrapper}>
                        <PercentageChange coin={this.state.coin}/>
                    </View> */}
                    <View style={styles.viewWrapper}>
                        {this.state.modal ?
                            <SelectExchange coin={this.state.coin} selectExchange={this.selectExchange}/>
                            :
                            <Chart coin={this.state.coin} selectedIndex={this.state.selectedIndex}/>
                        }
                    </View>
                    <Text>Last Updated: {
                        moment((this.state.coin.lastUpdated * 1000)).format('h:mm')
                    }</Text>
                </View>

            </Card>
            </ScrollView>
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

