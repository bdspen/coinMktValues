
import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'
import Watched  from './Watched'
import All from './All'
import CoinDetails from './CoinDetails'

export const WatchedStack = StackNavigator({
  Watched: {
    screen: Watched,
    title: 'Watched',
  },
  Details: {
    screen: CoinDetails,
    navigationOptions: ({ navigation }) => ({
      title: `COIN NAME`
    })
  },
}, {
  headerMode: 'none',
});

export const Tabs = TabNavigator({
  Watched: {
    screen: WatchedStack,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'Watched',
      tabBarIcon: ({ tintColor }) => <Icon name="eye" type={'font-awesome'} size={30} color={tintColor} />,
      tabBarOnPress: ({scene, jumpToIndex}) => {
        if (scene.route.index !== 0) { // if not on first screen of the StackNavigator in focused tab.
          navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: scene.route.routes[0].routeName }) // go to first screen of the StackNavigator
            ]
          }))
        }
          jumpToIndex(0) // go to another tab (the default behavior)
      }
    }),
  },
  All: {
    screen: All,
    navigationOptions: {
      tabBarLabel: 'All',
      tabBarIcon: ({ tintColor }) => <Icon name="all-inclusive" size={30} color={tintColor} />
    },
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    style: {marginTop: 20},
  },
})