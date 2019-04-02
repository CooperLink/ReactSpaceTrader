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
} from 'react-native';

class SkillComponent extends Component {
    render() {
        return(
            <View style={style.skillBar}>
                <Button
                    title = "-"
                    onPress={() => {
                        this.props.navigation.navigate('Home');
                    }}
                />
                <Text> Skill Here </Text>
                <Button
                    title = "+"
                    onPress={() => {
                        this.props.navigation.navigate('Home');
                    }}
                />
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
                <SkillComponent/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center'
    },
    nameBar: {
        marginTop: 30
    },
    skillBar: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'

    }
});
