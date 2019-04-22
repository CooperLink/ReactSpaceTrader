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
let curPlanetRef = db.ref('/Planets');
let curCoordsRef = db.ref('/Planets/curCoords');
let testRef = db.ref('/Test');
let planets = "placeholder";
let planetNames = ["Aldea","Antedi","Brax","Calondia","Capelle","Cheron","Daled","Janus","Japori"];
planetsRef.once('value', function(snapshot) {
    planets = snapshot.val();
});

class PlanetDisplay extends Component {
    constructor(props){
        super();
    }

    render() {
        return (
            <View>
                <Text style={styles.bigText}>{this.props.name}</Text>
                <Text style={styles.bigishText}>{" "}</Text>
            </View>
        )
    }
}

export default class TravelScreen extends Component {
    constructor(props) {
        super()
        this.validPlanets = this.generateValidPlanets();
    }

    generateValidPlanets() {
        var valid = [];
        testRef.update({
            visited: "yes"
        })
        for (var planet in planets) {
            if (this.getDistance(planet) <= 100) {
                testRef.update({
                    passed: "yes"
                })
                valid.push(planet);
            }
        }
        return valid;
    }

    getDistance(item) {
        testRef.update({
            distance: "yes"
        })
        var xCoord = 0;
        var yCoord = 0;
        var xCur = 0;
        var yCur = 0;
        curCoordsRef.once('value', function(snapshot) {
            let temp = snapshot.val();
            xCur = temp[0];
            yCur = temp[1];
        });
        for (var i = 0; i < planetNames.length; i++) {
            var name = item[0][0]
            testRef.update({
                planet: planetNames[i]
            })
            if (planetNames[i] == item[0]) {
                testRef.update({
                    found: "yes"
                })
                var coords = []
                specificRef = db.ref('/Planets/coordinates/' + i)
                specificRef.once('value', function(snapshot) {
                    coords.push(snapshot.val());
                });
                xCoord = coords[0]
                yCoord = coords[1]

                var sum = Math.sqrt(Math.pow(xCoord + xCur, 2) +
                Math.pow(yCoord + yCur, 2))
                testRef.update({
                    val: sum
                })
                return sum;
            }
        }
    }

    updateCoords(item) {
        for (var i = 0; i < planetNames.length; i++) {
            if (planetNames[i] == item[0]) {
                var coords = []
                specificRef = db.ref('/Planets/coordinates/' + i)
                specificRef.once('value', function(snapshot) {
                    curPlanetRef.update({
                        curCoords: snapshot.val()
                    })
                });

                
            }
        }
    }

    render() {
        return (
            <View>
                <Button style={styles.container}
                    title = "Back"
                    onPress={() => {
                        this.props.navigation.navigate('Start');
                    }}
                />
                <ScrollView>
                    {
                        planets.map((item) =>
                            (
                                <View key={item[0]} style={styles.planetView}>
                                    <PlanetDisplay name={item[0]} planet={item}/>
                                    <Button
                                        title = "Travel Here"
                                        onPress={() => {
                                            curPlanetRef.update({
                                                curPlanet: item
                                            })
                                            this.updateCoords(item);
                                            this.props.navigation.navigate('Start');
                                        }}
                                    />
                                </View>
                            ))
                    }
                </ScrollView>
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
    },
    planetView: {
        flex: 1,
        flexDirection: 'row',
    },
    bigText: {
        fontSize: 32,
    },
    bigishText: {
        fontSize: 22,
    }
});
