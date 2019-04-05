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
                        this.setState({level: this.state.level - 1});
                    }}
                />
                <Text> {this.props.skill} : {this.state.level} </Text>
                <Button style={{justifyContent: 'flex-end',}}
                    title = "+"
                    onPress={() => {
                        this.setState({level: this.state.level + 1});
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
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={style.container}>
                <TextInput
                    style={style.nameBar}
                    placeholder={"Enter Name Here"}
                    onChangeText={(text) => this.setState({text})}
                />

                <Text>Player Gen Screen</Text>
                <SkillComponent skill = "Pilot"/>
                <SkillComponent skill = "Fighter"/>
                <SkillComponent skill = "Trader"/>
                <SkillComponent skill = "Engineer"/>
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
