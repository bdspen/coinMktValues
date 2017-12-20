import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View, SectionList } from 'react-native';
import { List, ListItem, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'
import { Storage } from '../Storage/storage'
import { Config } from '../Config'

const settingsFields = {
    Lists: {
        name: "Lists",
        limitNumberOfCoins: {
            title: "Limit Number of Coins", 
            switchButton: false
        },
        disableSearchBar: {
            title: "Disable Search Bar",
            switchButton: true
        }
    },
    Charts: {
        name: "Charts",            
        numberOfCandles: {
            title: "Number of Candles",
            switchButton: false
        },
        animations: {
            title: "Animations",
            switchButton: true
        }
    },
    Navigation: {
        name: "Navigation",
        navigationBarPosition: {
            title: "Navigation Bar Position (top / bottom)",
            switchButton: false
        },
        animations: {
            title: "Animations",
            switchButton: true
        }
    }
}

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            settings: null,
            inputValue: null,
            settings: null
        }
    }

    async componentDidMount() {
        this.getSettings()
    }

    async getSettings(){
        const storage = new Storage()        
        const settings = await storage.getSettings()
        this.setState({
            isLoading: false,
            settings: settings,
        }, this.forceUpdate())
    }

    async updateStoredSettings(newSettings){
        const storage = new Storage()        
        const settings = await storage.setSettings()
        this.setState({settings: settings})
    }

    renderSwitchType(item) {
        return <ListItem hideChevron={true} switchButton={true} title={item.title}/>
    }

    renderNumberForm(item){
        return (<View>
            <FormLabel style={{fontWeight: 'normal'}}>{item.title}</FormLabel>                    
            <FormInput
                style={{height: 40}}
                onChangeText={(inputValue) => {
                    this.setState({
                        settings: Object.assign(this.state.settings, { [item.key]: inputValue })
                    });
                }}
                value={String(this.state.settings[item.key])}
            />
        </View>)
    }

    _renderListsSettingGroup = ({ item }) => (
        <ListItem title={item} titleStyle={{fontWeight:'bold'}} subtitle={
            (<List>
                <ListItem/>
                <FlatList
                    extraData={this.state}                   
                    data={Config.settingsFields[item]}
                    keyExtractor={(settingItem, j) => j}                    
                    renderItem={({item}) => (
                        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                            { this.state.settings && this.renderItemType(item) }
                        </View>   
                    )}
                />
            </List>)
        }
        hideChevron={true}>
        </ListItem>
    )

    render() {
        return (
            <View>
                <Text style={{fontSize: 20}}>{settingsFields.Lists.name}</Text>

                <FormLabel>{settingsFields.Lists.disableSearchBar.title}</FormLabel>            
                <FormInput />
                <FormValidationMessage>Error message</FormValidationMessage>
            </View>
        )
    }
}