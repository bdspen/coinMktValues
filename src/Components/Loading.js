import React from 'react';
import { Animated, Text, View, Easing } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Loading extends React.Component {

    spinValue = new Animated.Value(0)
    iconFadeAnim = new Animated.Value(0)
    textFadeAnim = new Animated.Value(0)

    componentDidMount() {
        this.spin()
        this.iconFade()
        this.textFade()
    }

    iconFade(){
        Animated.timing(
            this.iconFadeAnim,
            {
                toValue: 1,
                duration: 2400,
            }
        ).start(() => this.iconFadeRev());
    }

    iconFadeRev(){
        Animated.timing(
            this.iconFadeAnim,
            {
                toValue: 0,
                duration: 2400,
            }
        ).start(() => this.iconFade(0));
    }

    textFade(){
        Animated.timing(
            this.textFadeAnim,
            {
                toValue: .9,
                duration: 800,
            }
        ).start(() => this.textFadeRev(0));
    }

    textFadeRev(){
        Animated.timing(
            this.textFadeAnim,
            {
                toValue: .4,
                duration: 1200,
            }
        ).start(() => this.textFade(0));
    }

    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 3500,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View>
                <Animated.View
                    style={{
                        ...this.props.style,
                        opacity: this.iconFadeAnim,
                        transform: [{ rotate: spin }]                    
                    }}
                >
                    <Icon
                        name="rhombus-outline"
                        type='material-community'
                        size={100}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        ...this.props.style,
                        opacity: this.textFadeAnim
                    }}
                >
                <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>LOADING</Text>
                </Animated.View>
            </View>
        );
    }
}