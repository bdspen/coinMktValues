import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Tabs } from './Tabs'
import { FormattedWrapper } from 'react-native-globalize';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {}

    render() {
        return (
            <FormattedWrapper locale={"en"}>
                <Tabs />
            </FormattedWrapper>
        )
    }
}