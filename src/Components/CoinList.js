import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Loading from './Loading'
import { List, ListItem, SearchBar, Icon } from 'react-native-elements'
import PercentageChange from './PercentageChange'
export default class CoinList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            coinList: [],
            filteredCoinList: []
        }
        this.filterList = this.filterList.bind(this)
        this.removeFilter = this.removeFilter.bind(this)        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            coinList: nextProps.coinList,
            filteredCoinList: nextProps.coinList,
            isLoading: false
        });
    }

    filterList(query){
        if (query.length <= 2) {
            if (this.state.filteredCoinList.length > 0) this.removeFilter()
            return
        }
        const keys = ['name', 'symbol']
        this.setState({
            filteredCoinList: this.state.coinList.filter(coin => {
                const keys = ['name', 'symbol']
                return keys.filter(key => coin[key].toLowerCase().includes(query.toLowerCase())).length
            })
        })
    }

    removeFilter(){
        this.setState({ filteredList: this.state.coinList})
    }

    _renderItem = ({ item }) => (
        <ListItem
            // leftIcon={<Image source={}/>}
            title={item.name + ' (' + item.symbol + ')'}
            style={{fontSize: 20}}
            onPress={() => this.props.navigation.navigate('Details', {coin: item})}            
            subtitle={'$' + item.priceUsd}
            subtitleStyle={{ fontSize: 17, color: 'black'}}
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

                <SearchBar
                lightTheme
                round
                onChangeText={this.filterList}
                onClearText={this.removeFilter}
                placeholder='Search...' />

                <List containerStyle={{ marginTop: 0 }}>
                    <FlatList
                        data={this.state.filteredCoinList}
                        keyExtractor={(coin, index) => coin.id}
                        renderItem={this._renderItem}
                    />
                </List>
            </View>
        );
    }
}