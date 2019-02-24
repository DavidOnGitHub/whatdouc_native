import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import Login from '../../views/Login';
import MapView from '../../views/MapView';
import ListView from '../../views/ListView';
import Settings from '../../views/Settings';

const TabIcon = {
  MapView: {
    active: require('../../assets/icons/map-active.png'),
    inactive: require('../../assets/icons/map-inactive.png')
  },
  ListView: {
    active: require('../../assets/icons/list-active.png'),
    inactive: require('../../assets/icons/list-inactive.png')
  },
  Settings: {
    active: require('../../assets/icons/gear-active.png'),
    inactive: require('../../assets/icons/gear-inactive.png')
  },
  Profile: {
    active: require('../../assets/icons/user-active.png'),
    inactive: require('../../assets/icons/user-inactive.png')
  }
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: 'white',
    borderTopWidth: 0,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.3
  },
  icon: {
    resizeMode: 'contain'
  },
  tabContainer: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeIcon: {
    height: 35,
    width: 35
  },
  inactiveIcon: {
    height: 26,
    width: 26
  },
  activeMapIcon: {
    height: 40,
    width: 40
  },
  active: {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.8
  }
});

export default createBottomTabNavigator(
  {
    Profile: Login,
    MapView,
    ListView,
    Settings,
  },
  {
    tabBarOptions: {
      style: styles.container
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let style = focused ? styles.activeIcon : styles.inactiveIcon;
        if (routeName === 'MapView' && focused) {
          style = styles.activeMapIcon;
        }
        return (
          <View style={[styles.tabContainer, focused && styles.active]}>
            <Image
              style={[styles.icon, style]}
              source={TabIcon[routeName][focused ? 'active' : 'inactive']}
            />
          </View>
        );
      },
      tabBarLabel: () => ''
    })
  }
);
