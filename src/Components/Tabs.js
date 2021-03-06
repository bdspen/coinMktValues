
import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'
import Watched  from './Watched'
import All from './All'
import Settings from './Settings'
import SelectExchange from './SelectExchange'
import CoinDetails from './CoinDetails'
import { Platform } from 'react-native'
import { Config } from '../Config';

const tabBarOptions = Platform.OS === 'ios' ? 
{
  //ios
  labelStyle: {
    fontSize: 14,
  },
  style: { marginTop: 20 },
} : {
  //android
  labelStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 60
  },
  style: {
    backgroundColor: Config.colors.veryDarkGrey,
  },
  showIcon: true,
  showLabel: true,
}

export const WatchedStack = StackNavigator({
  Watched: {
    screen: Watched,
    title: 'Watched',
  },
  Details: {
    screen: CoinDetails,
  },
  SelectExchange: {
    screen: SelectExchange,
  }
}, {
  headerMode: 'none'
});

export const Tabs = TabNavigator({
  Watched: {
    screen: WatchedStack,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'Watched',
      tabBarIcon: ({ tintColor }) => <Icon name="eye" type={'font-awesome'} size={30} color={tintColor}/>,
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
      },
    }),
  },
  All: {
    screen: All,
    navigationOptions: {
      tabBarLabel: 'All',
      tabBarIcon: ({ tintColor }) => <Icon name="all-inclusive" size={30} color={tintColor} />,
    },
  },
  // Settings: {
  //   screen: Settings,
  //   navigationOptions: {
  //     tabBarLabel: 'Settings',
  //     tabBarIcon: ({ tintColor }) => <Icon name='settings' size={30} color={tintColor} />
  //   },
  // },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  lazy: true,
  tabBarOptions: tabBarOptions
})