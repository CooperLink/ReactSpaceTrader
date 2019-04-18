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
import { db } from '../config';

let creditsRef = (db.ref('Credits'));



default export class MarketScreen extends Component {
    constructor(props) {
        super()
        this.state = {
            credits: creditsRef
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
            credits: creditsRef
        };
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.headerTitle}>
                    Welcome to PLANETPLACEHOLD's Market
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
        justifyContent: 'flex-end',
    },
    marketStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    }
});