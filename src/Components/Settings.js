import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Config } from '../Config'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            settings: null
        }
    }

    async componentDidMount() {
        // const settings = await storage.getSettings()
        this.setState({
            isLoading: false,
            settings: null,
        })

    }

    _renderSettingGroup(){
        
    }

    render() {
        return (
            <List containerStyle={{ marginTop: 0 }}>
                <FlatList                   
                    data={Object.keys(Config.settingsFields)}
                    keyExtractor={(settingGroup, index) => index}
                    renderItem={this.renderSettingGroup}
                />
            </List>
            <View>
                <List>
                    {
                        Object.keys(Config.settingsFields).map((key, i)  => (
                            <ListItem title={key} key={i}>
                                <List>
                                    {
                                        Config.settingsFields[key].map((setting) => {
                                            <ListItem title={setting}/>
                                        })
                                    }
                                </List>
                            </ListItem>
                        ))
                    }
                </List>
            </View>
        )
    }
}