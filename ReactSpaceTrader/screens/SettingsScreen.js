import React from 'react';
import { StyleSheet, FlatList, View, Text} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

const screenStyle = StyleSheet.create({
    container: {
        //Alignment of screen
        alignItems: 'center',
        //Background Color Below
        backgroundColor: '#fff'
    }
})

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
