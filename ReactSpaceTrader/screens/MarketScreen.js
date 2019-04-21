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
let planetResource = 3;
let planetTech = "HI_TECH";
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

let inventoryRef = (db.ref('Player/Inventory'));
let inventory;
inventoryRef.on('value', function(snapshot) {
    inventory = (snapshot.val());
    console.log(snapshot.toJSON());
    console.log('Snapshot:Inventory');
    console.log(inventory);
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
    // determinePrices(validItems) {
        var pricedItems = [];
        // basePrice + IPL * (Planet Tech Level - MTLP) + (basePrice * variance/100)
        // add base price
        console.log('VALID ITEMS:')
        console.log(validItems);
        for (var item in validItems) {
            itemArr = validItems[item];
            var basePrice = itemArr[4];
            console.log(basePrice);
            var priceIncrease = itemArr[5];
            var minTechProduce = itemArr[1];
            var price = basePrice + priceIncrease * (techLevelDict[planetTech] - minTechProduce);
            console.log(price + ": " + itemArr[0]);
            //Might divide below by 100
            price = price + basePrice * (Math.floor(Math.random() * itemArr[6])/100) ;
            var pricedItem = [itemArr[0], Math.floor(price)];
            // The above is Name, Price
            pricedItems.push(pricedItem);
        }
        console.log("Priced Items: ")
        console.log(pricedItems);
        return pricedItems;
        // add IPL * planet tech - MTLP

        // add basePrice * variance / 1
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
                <Text> I DON"T GET THIS either </Text>
                <ScrollView>
                    {
                        this.validItems.map((item) =>
                            (
                                <View key = {item[0]}>
                                    <View style = {style.marketItem}>
                                        <Text> {item[0]} </Text>
                                        <Text> ${item[1]} </Text>
                                        <Text> OWNED: PLACEHOLDER </Text>
                                        <Text> BUY </Text>
                                        <Text>Sell</Text>
                                    </View>

                                    <View style = { style.item_separator }/>
                                </View>

                            ))
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
                <Text> I DON"T GET THIS either </Text>

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
                <Text> OWNED: {this.state.owned} </Text>
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
        marginTop: 15,
    },
    marketItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#666',
        width : '100%',
        height: 40,
        alignContent: 'center',
        alignItems: 'center'

    },
    item_separator:
        {
            height: 3,
            width: '100%',
            backgroundColor: '#fff',
        }
});