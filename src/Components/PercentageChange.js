import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { Config } from '../Config'

export default class PercentageChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    style(value) {
        const intPct = parseFloat(value)
        if (intPct === 0) return
        if(intPct > 0) return { color: Config.colors.positiveGreen }
        else return { color: Config.colors.negativeRed }
    }

    render() {

        const { pctChangeHour, pctChangeDay, pctChangeWeek } = this.props.coin

        return (
            <View>
                <Text style={this.style(pctChangeHour)}>hour: % {pctChangeHour}</Text>
                <Text style={this.style(pctChangeDay)}>day: % {pctChangeDay}</Text>
                <Text style={this.style(pctChangeWeek)}>week: % {pctChangeWeek}</Text>
            </View>
        );
    }
}