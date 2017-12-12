import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';

export default class PercentageChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    render() {
        return (  
            <View>
                <Text>hour: % {this.props.coin.pctChangeHour}</Text>
                <Text>day: % {this.props.coin.pctChangeDay}</Text>
                <Text>week: % {this.props.coin.pctChangeWeek}</Text>
            </View>
        );
    }
}