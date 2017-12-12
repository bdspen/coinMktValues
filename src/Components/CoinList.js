import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Loading from './Loading'
import { List, ListItem } from 'react-native-elements'
import PercentageChange from './PercentageChange'
export default class CoinList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coinList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            coinList: nextProps.coinList,
            isLoading: false
        });
    }

    _renderItem = ({ item }) => (
        <ListItem
            // leftIcon={<Image source={}/>}
            title={item.name + ' (' + item.symbol + ')'}
            style={{fontSize: 20}}
            onPress={() => this.props.navigation.navigate('Details', {coin: item})}            
            subtitle={'$' + item.priceUsd}
            subtitleStyle={{fontWeight: 'bold'}}
            rightIcon={<PercentageChange coin={item} />}
            rightTitleNumberOfLines={3}
        />
    );

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Loading style={{width: 250, height: 100,}} />
                </View>
            );
        }

        return (
            <View>
                <List containerStyle={{ marginTop: 0 }}>
                    <FlatList
                        data={this.state.coinList}
                        keyExtractor={(coin, index) => coin.id}
                        renderItem={this._renderItem}
                    />
                </List>
            </View>
        );
    }
}