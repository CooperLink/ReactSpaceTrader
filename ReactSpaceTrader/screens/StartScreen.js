import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,

} from 'react-native';
import { db } from '../config';

let curPlanetRef = db.ref("Planets/curPlanet");
var name = "placeholder";
curPlanetRef.once('value', function(snapshot) {
    planet = snapshot.val();
    name = planet[0];
});

export default class StartScreen extends Component {
    componentWillMount() {
        curPlanetRef.once('value', function(snapshot) {
            planet = snapshot.val();
            name = planet[0];
        });
    }

    componentDidUpdate() {
        curPlanetRef.once('value', function(snapshot) {
            planet = snapshot.val();
            name = planet[0];
        });
    }

    componentWillUnmount() {
        curPlanetRef.once('value', function(snapshot) {
            planet = snapshot.val();
            name = planet[0];
        });
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text> {"Current Planet: " + name} </Text>
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