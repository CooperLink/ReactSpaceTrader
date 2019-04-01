import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from './screens/HomeScreen';
import StartScreen from './StartScreen';

const AppNavigator = createStackNavigator({
    Home: { screen : HomeScreen},
    Start: { screen: StartScreen}

});

export default AppNavigator;