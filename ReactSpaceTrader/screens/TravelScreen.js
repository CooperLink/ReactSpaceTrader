import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Platform,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { db } from '../config';

let planetsRef = db.ref('/Planets/planets');
let planets = "";
planetsRef.once('value', function(snapshot) {
    planets = snapshot.val();
});

export default class TravelScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title = "Back"
                    onPress={() => {
                        this.props.navigation.navigate('Start');
                    }}
                />
                <ScrollView>
                    {
                        planets.map((item) =>
                            (
                                <View key = {item[0]}>
                                    <View>
                                        <Text> {item[0]} </Text>
                                        <Text> {item[1]} </Text>
                                        <Text> {item[1]} </Text>
                                    </View>

                                    <View/>
                                </View>

                            ))
                    }

                </ScrollView>
            </View>
        )
    }

    componentDidMount() {

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

