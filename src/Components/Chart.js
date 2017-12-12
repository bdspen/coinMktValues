
import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Networking } from '../Networking/networking'
import Loading from './Loading'
import moment from 'moment';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryCandlestick } from "victory-native";

export default class Chart extends Component {

    timeScales = [ 'toMinute', 'toHour', 'toDay' ]
    networking = null
    numberOfCandles = 10

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coin: null,
            chartData: null,
            selectedIndex: null
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
    }

    fetchChartData() {
        this.networking.getHistory(this.timeScales[this.state.selectedIndex], this.state.coin.symbol, 'USD', 10)
        .then(({ Data }) => {

            Data.forEach(({time}, i) => {
                if(i === (this.numberOfCandles)) return Data[i].x = 'now'
                else Data[i].x = `${-(this.numberOfCandles - i)}`
            })

            this.setState({
                isLoading: false,
                chartData: Data
            })
        })
    }

    render() {
        // if (this.state.isLoading) return (
        //     <View style={{ flex: 1 }}>
        //         <Loading />
        //     </View>
        // );

        return (
            <View style={styles.chart}>
                <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }} domainPadding={ 5 }>
                    
                    <VictoryAxis />
                    <VictoryAxis dependentAxis />
                    
                    <VictoryCandlestick
                        style={{
                            data: {
                                fillOpacity: 0.85
                            },
                            labels: {
                                fontSize: 12, fill: "#c43a31"
                            }
                        }}
                        animate={{
                            onEnter: {
                                duration: 100,
                                before: () => ({
                                    _y: 0
                                })
                            }
                        }}
                        candleColors={{ positive: "#56a440", negative: "#f86940" }}
                        data={this.state.chartData}
                    />
                </VictoryChart>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    chart: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 35
    }
})
