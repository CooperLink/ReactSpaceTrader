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
                    onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
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
            text: '',
            total: 0,
            levels: {
                pilot: 0,
                fighter: 0,
                trader: 0,
                engineer: 0
            }
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
                        db.ref('/Skills').update({
                            value: this.state.levels
                          });
                    }}
                />
                <DifficultySelector/>
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
