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
    Dimensions,
    TextInput,
} from 'react-native';
import { db } from '../config';
import items from '../constants/MarketItems';
const { width, height } = Dimensions.get('window');

let planetRef = (db.ref('Planets/curPlanet'));
let planetName = "PlaceHolder";
planetRef.once('value', function(snapshot) {
    const planet = snapshot.val();
    planetName = planet.attributes[0];
});


let creditsRef = (db.ref('Credits/value'));
let numCredits = 0;
creditsRef.on('value', function(snapshot) {
    numCredits = parseInt(snapshot.val());
  });



export default class MarketScreen extends Component {
    constructor(props) {
        super()
        this.state = {
            credits: numCredits
        }
    }
    render() {
        return (
            <View style={style.marketStyle}>
                <MarketHeader/>


            </View>


        );
    }
}

class MarketHeader extends Component {
    constructor() {
        super();
        this.state = {
            credits: numCredits
        };
    }

    render() {
        return (

            <View style={style.marketStyle}>
                <Text style={style.headerTitle}>
                    Welcome to {planetName}'s Market
                </Text>
                <Text style={style.creditsText}>
                    Credits : {this.state.credits}
                </Text>
            </View>
        );
    };
}

const style = StyleSheet.create({
    marketHeader: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',


    },
    headerTitle : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    creditsText: {
        fontSize: 12,
        alignItems: 'flex-end',
    },
    marketStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: height,
        width:width,
        marginTop: 10,
    }
});