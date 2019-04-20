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
import {items} from '../constants/MarketItems';
const { width, height } = Dimensions.get('window');

let planetRef = (db.ref('Planets/curPlanet'));
let planetName = "PlaceHolder";
let planetResource, planetTech;
planetRef.once('value', function(snapshot) {
    const planet = snapshot.val();
    console.log(snapshot.toJSON());
    planetName = planet["0"];
    planetResource = planet["1"];
    planetTech = planet["2"];
});


let creditsRef = (db.ref('Credits/value'));
let numCredits = 0;
creditsRef.on('value', function(snapshot) {
    numCredits = parseInt(snapshot.val());
  });



export default class MarketScreen extends Component {
    constructor(props) {
        super()
        this.validItems = this.generateValidItems();
        this.state = {
            credits: numCredits
        }
    }

    generateValidItems() {
        var validItems = [];
        console.log(planetTech);
        var planetTechNumber = techLevelDict[planetTech];
        console.log('Check planet tech');
        console.log(planetTechNumber);
        for(var item in items) {
            var itemArr = items[item];
            if (itemArr[1] <= planetTechNumber) {
                console.log(itemArr[0]);
                validItems.push(itemArr);
            }
        }
        return validItems;
    }

    render() {
        return (
            <View style={style.marketStyle}>
                <MarketHeader/>
                <ScrollView>
                    {
                        
                    }

                </ScrollView>


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

class MarketItem extends Component {
    constructor() {
        super();
        this.state = {
            owned: 0
        }
    }

    render() {
        return (
            <View style = {style.marketItem}>
                <Text> PRODUCT </Text>
                <Text> PRICE </Text>
                <Text> AMOUNT OWNED: {this.state.owned} </Text>
                <Text> BUY </Text>
                <Text>Sell</Text>
            </View>
        );
    };
}

var techLevelDict = {
    "PRE_AGRICULTURE" : 0,
    "AGRICULTURE" : 1,
    "MEDIEVAL" : 2,
    "RENAISSANCE" : 3,
    "EARLY_INDUSTRIAL" : 4,
    "INDUSTRIAL" : 5,
    "POST_INDUSTRIAL": 6,
    "HI_TECH" : 7
};

let validItems = [];
const style = StyleSheet.create({
    marketHeader: {
        flex: 1,
        backgroundColor: '#555',
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
    },
    marketItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#356',
        width : '100%',
        height: 20,

    },
    scroller: {

    }
});