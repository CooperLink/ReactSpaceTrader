import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,

} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default class StartScreen extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text> PlaceHolder </Text>
                <Button> title = 'Market' </Button>
                <Button> Fuel Up </Button>
                <Button> Player Screen</Button>
                <Button> Travel Screen</Button>
            </View>
        )
    }
}