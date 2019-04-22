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
    Dimensions,
    Alert
} from 'react-native';
import { db } from '../config';

let planetsRef = db.ref('/Planets/planets');
let curPlanetRef = db.ref('/Planets');
let coordsRef = db.ref('/Planets/coordinates')
let curCoordsRef = db.ref('/Planets/curCoords');
let testRef = db.ref('/Test');
let planets = "placeholder";
let planetNames = [];
db.ref('/Planets/names').on('value', function(snapshot) {
    planetNames = snapshot.val();
});
planetsRef.on('value', function(snapshot) {
    planets = snapshot.val();
});
let coordinates = "placeholder"
coordsRef.on('value', function(snapshot) {
    coordinates = snapshot.val();
});
let curCoords = "placeholder"
curCoordsRef.on('value', function(snapshot) {
    curCoords = snapshot.val();
});

var valid = [];

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
        this.state = {
            i: 0,
            sum: 0
        }
    }

    componentWillMount() {
        planetsRef.once('value', function(snapshot) {
            planets = snapshot.val();
        });
        coordsRef.once('value', function(snapshot) {
            coordinates = snapshot.val();
        });
        curCoordsRef.once('value', function(snapshot) {
            curCoords = snapshot.val();
        });
        testRef.update({
            visited: "yes"
        })
        for (var i = 0; i < planets.length; i++) {
            testRef.update({
                list: planets[i]
            })
            var dist = this.getDistance(planets[i])
            if (dist <= 55 && dist != 0) {
                testRef.update({
                    passed: planets[0]
                })
                valid.push(planets[i]);
            }
        }
        testRef.update({
            final: valid[0]
        })
    }

    componentWillUnmount() {
        valid = []
    }

    getDistance(item) {
        const that = this
        var sum = 0;
        var xCoord = 0;
        var yCoord = 0;
        let xCur = curCoords[0];
        let yCur = curCoords[1];
        for (var i = 0; i < planetNames.length; i++) {
            if (planetNames[i] === item[0]) {
                var word = "/Test/" + i
                var ref = db.ref(word);
                xCoord = coordinates[i][0]
                yCoord = coordinates[i][1]
                ref.update({
                    xCur: xCur,
                    yCur: yCur,
                    xCoord: xCoord,
                    yCoord: yCoord,
                    distance: Math.sqrt(Math.pow(xCur - xCoord, 2) + Math.pow(yCur - yCoord, 2))
                })
                return Math.sqrt(Math.pow(xCur - xCoord, 2) + Math.pow(yCur - yCoord, 2))
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

    randomEvent(item) {

        if (Math.floor(Math.random() * 3) === 1) {
            var creditChange = 75;
            var alertHeader = "You found a bag of Credits!"
            var alertSubHeader = creditChange + " Credits added to balance"
            if (Math.floor(Math.random() * 2) === 1) {
                alertHeader = "You were attacked by a Space APE!"
                alertSubHeader = creditChange + " were stolen from your balance"
                creditChange *= -1;
            }
            let creditsRef = (db.ref('Credits/value'));
            let numCredits = 0;
            creditsRef.on('value', function(snapshot) {
                numCredits = parseInt(snapshot.val());
            });
            db.ref('/Credits').update({
                value: (numCredits + creditChange)
            });
            Alert.alert(
                alertHeader,
                alertSubHeader,
                [
                  {text: 'OK', onPress: () => this.props.navigation.navigate('Start')},
                ],
                {cancelable: false},
            );
        } else {
            this.props.navigation.navigate('Start');
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
                        valid.map((item) =>
                            (
                                <View key={item[0]} style={styles.planetView}>
                                    <PlanetDisplay name={item[0]} planet={item}/>
                                    <Button
                                        title = "Travel Here"
                                        onPress={() => {
                                            curPlanetRef.update({
                                                curPlanet: item
                                            })
                                            db.ref('/Ship').update({
                                                hasFuel: false
                                            });
                                            this.updateCoords(item);
                                            this.randomEvent();
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
        fontSize: 12,
    }
});