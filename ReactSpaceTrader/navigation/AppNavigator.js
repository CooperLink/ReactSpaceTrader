import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import PlayerGenScreen from '../screens/PlayerGenScreen';
import StartScreen from '../screens/StartScreen';
import MarketScreen from '../screens/MarketScreen';

const MainNavigator = createSwitchNavigator({
    Home: { screen : HomeScreen},
    PlayerGen: { screen : PlayerGenScreen},
    Start: { screen: StartScreen},
    Market: { screen: MarketScreen}

});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;