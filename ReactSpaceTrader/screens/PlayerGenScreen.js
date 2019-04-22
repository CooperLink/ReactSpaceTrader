import React, {Component} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    TextInput,
    Picker
} from 'react-native';
import { db } from '../config';

let engineerRef = db.ref('Engineer');
let fighterRef = db.ref('Fighter');
let pilotRef = db.ref('Pilot');
let traderRef = db.ref('Trader');
let STARTING_CREDITS = 1000;

let MAX_UNIVERSE_WIDTH = 100;
let MAX_UNIVERSE_HEIGHT = 100;

var planetNames = ["Acamar", "Adahn", "Aldea", "Andevian", "Antedi", "Balosnee",
    "Baratas", "Brax", "Bretel", "Calondia", "Campor", "Capelle", "Carzon",
    "Castor", "Cestus", "Cheron", "Courteney", "Daled", "Damast", "Janus", "Japori"];

var chosenPlanets = [];

var resourceTypes = ["NOSPECIALRESOURCES", "MINERALRICH", "MINERALPOOR", "DESERT", 
    "LOTSOFWATER", "RICHSOIL", "POORSOIL", "RICHFAUNA", "LIFELESS", "WEIRDMUSHROOMS", 
    "LOTSOFHERBS", "ARTISTIC", "WARLIKE"];

var techLevels = ["PRE_AGRICULTURE", "AGRICULTURE", "MEDIEVAL", "RENAISSANCE", "EARLY_INDUSTRIAL", "INDUSTRIAL",
    "POST_INDUSTRIAL", "HI_TECH"];

global.generatedPlanets = [];

global.planetCoordinates = [];

planetNames.forEach(element => {
    if (Math.floor(Math.random() * 2) === 1) {
        //order is: Name, ResourceLevel, TechLevel
        var attributes = [];
        attributes.push(element);
        attributes.push(resourceTypes[Math.floor(Math.random() * resourceTypes.length)]);
        attributes.push(techLevels[Math.floor(Math.random() * techLevels.length)]);
        generatedPlanets.push(attributes);
        chosenPlanets.push(element);
    }
});

generatedPlanets.forEach(element => {
    //order is: x, y
    var coordinates = [];
    coordinates.push(Math.floor(Math.random() * MAX_UNIVERSE_WIDTH) + 1);
    coordinates.push(Math.floor(Math.random() * MAX_UNIVERSE_HEIGHT) + 1);
    planetCoordinates.push(coordinates);
});



class SkillComponent extends Component {
    constructor(props){
        super();
        this.state = {
            level: 0
        }
    }
    render() {
        return(
            <View style={style.skillBar}>
                <Button style={{justifyContent: 'flex-start'}}
                    title = "-"
                    onPress={() => {
                        if (this.props.decreaseVals(this.props.skill, this.state.level)){
                            this.setState({
                                level: this.state.level - 1
                            })
                        }
                    }}
                />
                <Text> {this.props.skill} : {this.state.level} </Text>
                <Button style={{justifyContent: 'flex-end',}}
                    title = "+"
                    onPress={() => {
                        if (this.props.increaseVals(this.props.skill, this.state.level)){
                            this.setState({
                                level: this.state.level + 1
                            })
                        }
                    }}
                />
            </View>
        );
    }
}

class DifficultySelector extends Component {

    constructor(props){
        super();
        this.state = {
            currency: "Medium"
        }
    }
    render(){
        return(
            <View>
                <Text> Current Difficulty : {this.state.currency} </Text>
                <Picker
                    selectedValue={this.state.currency}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.props.updateDifficulty(itemValue)
                        this.setState({currency: itemValue})
                    }}>
                    <Picker.Item label = "Easy" value = "Easy"/>
                    <Picker.Item label = "Medium" value = "Medium"/>
                    <Picker.Item label = "Hard" value = "Hard"/>
                    <Picker.Item label = "Impossible" value = "Impossible"/>
                </Picker>
            </View>
        );
    }
}

export default class PlayerGenScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            total: 0,
            levels: {
                pilot: 0,
                fighter: 0,
                trader: 0,
                engineer: 0
            },
            difficulty: "Medium"
        };
    }

    increaseVals(key, val) {
        if (key == "Pilot" && this.state.total < 16) {
            this.setState({
                total: this.state.total + 1,
                levels: {
                    pilot: this.state.levels.pilot + 1,
                    fighter: this.state.levels.fighter,
                    trader: this.state.levels.trader,
                    engineer: this.state.levels.engineer
                }
            })
            return true;
        } else if (key == "Fighter" && this.state.total < 16) {
            this.setState({
                total: this.state.total + 1,
                levels: {
                    pilot: this.state.levels.pilot,
                    fighter: this.state.levels.fighter + 1,
                    trader: this.state.levels.trader,
                    engineer: this.state.levels.engineer
                }
            })
            return true;
        } else if (key == "Trader" && this.state.total < 16) {
            this.setState({
                total: this.state.total + 1,
                levels: {
                    pilot: this.state.levels.pilot,
                    fighter: this.state.levels.fighter,
                    trader: this.state.levels.trader + 1,
                    engineer: this.state.levels.engineer
                }
            })
            return true;
        } else if (key == "Engineer" && this.state.total < 16) {
            this.setState({
                total: this.state.total + 1,
                levels: {
                    pilot: this.state.levels.pilot,
                    fighter: this.state.levels.fighter,
                    trader: this.state.levels.trader,
                    engineer: this.state.levels.engineer + 1
                }
            })
            return true;
        }
        return false;
    }

    decreaseVals(key, val) {
        if (key == "Pilot" && val > 0) {
            this.setState({
                total: this.state.total - 1,
                levels: {
                    pilot: this.state.levels.pilot - 1,
                    fighter: this.state.levels.fighter,
                    trader: this.state.levels.trader,
                    engineer: this.state.levels.engineer
                }
            })
            return true;
        } else if (key == "Fighter" && val > 0) {
            this.setState({
                total: this.state.total - 1,
                levels: {
                    pilot: this.state.levels.pilot,
                    fighter: this.state.levels.fighter - 1,
                    trader: this.state.levels.trader,
                    engineer: this.state.levels.engineer
                }
            })
            return true;
        } else if (key == "Trader" && val > 0) {
            this.setState({
                total: this.state.total - 1,
                levels: {
                    pilot: this.state.levels.pilot,
                    fighter: this.state.levels.fighter,
                    trader: this.state.levels.trader - 1,
                    engineer: this.state.levels.engineer
                }
            })
            return true;
        } else if (key == "Engineer" && val > 0) {
            this.setState({
                total: this.state.total - 1,
                levels: {
                    pilot: this.state.levels.pilot,
                    fighter: this.state.levels.fighter,
                    trader: this.state.levels.trader,
                    engineer: this.state.levels.engineer - 1
                }
            })
            return true;
        }
        return false;
    }

    updateDifficulty(val) {
        this.setState({
            difficulty: val
        })
    }

    render() {
        return (
            <View style={style.container}>
                <TextInput
                    style={style.nameBar}
                    placeholder={"Enter Name Here"}
                    onChangeText={(text) => this.setState({text})}
                />

                <Text>Points Remaining: {16 - this.state.total}</Text>
                <SkillComponent skill = "Pilot" level = {this.state.levels.pilot} increaseVals = {(a, b) => this.increaseVals(a, b)} decreaseVals = {(a, b) => this.decreaseVals(a, b)}/>
                <SkillComponent skill = "Fighter" level = {this.state.levels.fighter} increaseVals = {(a, b) => this.increaseVals(a, b)} decreaseVals = {(a, b) => this.decreaseVals(a, b)}/>
                <SkillComponent skill = "Trader" level = {this.state.levels.trader} increaseVals = {(a, b) => this.increaseVals(a, b)} decreaseVals = {(a, b) => this.decreaseVals(a, b)}/>
                <SkillComponent skill = "Engineer" level = {this.state.levels.engineer} increaseVals = {(a, b) => this.increaseVals(a, b)} decreaseVals = {(a, b) => this.decreaseVals(a, b)}/>
                <Button style={{justifyContent: 'flex-end',}}
                    title = "start"
                    onPress={() => {
                        if (this.state.total == 16 && this.state.text != "") {
                            db.ref('/Skills').update({
                                value: this.state.levels
                              });
                            db.ref('/Difficulty').update({
                                value: this.state.difficulty
                            });
                            db.ref('/Player').update({
                                name: this.state.text
                            });
                            db.ref('/Credits').update({
                                value: STARTING_CREDITS
                            });
                            db.ref('/Planets').update({
                                curPlanet: generatedPlanets[0],
                                curCoords: planetCoordinates[0],
                                planets: generatedPlanets,
                                coordinates: planetCoordinates
                            });
                            var items = {
                                Water: 0,
                                Furs: 0,
                                Food: 0,
                                Ore: 0,
                                Games: 0,
                                Firearms: 0,
                                Medicine: 0,
                                Machines: 0,
                                Narcotics: 0,
                                Robots: 0,
                            };
                            db.ref('/Player/Inventory').update({
                                currInven: items
                            });
                            db.ref('/Ship').update({
                                hasFuel: true
                            });
                            db.ref('/Planets').update({
                                names: chosenPlanets
                            })
                            this.props.navigation.navigate('Start');
                        }
                    }}
                />
                <DifficultySelector updateDifficulty = {(a) => this.updateDifficulty(a)}/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection: 'column',
        marginTop: 25,
        marginBottom: 25
    },
    nameBar: {
        marginTop: 30
    },
    skillBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#aaa',
        width: 300,
        height: 30

    }
});
