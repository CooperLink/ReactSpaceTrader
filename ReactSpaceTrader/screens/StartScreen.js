import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,

} from 'react-native';

export default class StartScreen extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text> PlaceHolder </Text>
                <Button
                    title = "Market"
                    onPress={() => {
                        this.props.navigation.navigate('Market');
                    }}
                />
                <Button
                    title = "Travel"
                    onPress={() => {
                        this.props.navigation.navigate('Travel');
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});