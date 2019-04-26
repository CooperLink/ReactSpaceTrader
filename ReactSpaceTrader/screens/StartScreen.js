import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    TextInput
} from 'react-native';
import { db } from '../config';

var fuelRef = db.ref('Ship/hasFuel');
var hasFuelledUp;
fuelRef.on('value', function(snapshot) {
    hasFuelledUp = (snapshot.val());
});
let curPlanetRef = db.ref("Planets/curPlanet");
var name = "placeholder";
curPlanetRef.once('value', function(snapshot) {
    planet = snapshot.val();
    name = planet[0];
});

export default class StartScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hasFuel: hasFuelledUp 
        };
    }

    componentDidUpdate() {
        curPlanetRef.once('value', function(snapshot) {
            planet = snapshot.val();
            name = planet[0];
        });
        fuelRef.on('value', function(snapshot) {
            hasFuel = (snapshot.val() === 'true');
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
                        console.log(this.state.hasFuel)
                        if (hasFuelledUp) {
                            this.props.navigation.navigate('Travel');
                        } else {
                            Alert.alert(
                                'No Fuel!',
                                'You first have to fuel up to travel',
                                [
                                  {text: 'OK'},
                                ],
                                {cancelable: false},
                            );
                        }
                    }}
                />
                <Button
                    title = "Fuel Up"
                    onPress={() => {
                        hasFuelledUp = true;
                        this.setState({
                            hasFuel: hasFuelledUp
                        })
                        db.ref('/Ship').update({
                            hasFuel: true
                        });
                    }}
                />
                <Text>Has Fuel Remaining: {this.state.hasFuel.toString()}</Text>
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