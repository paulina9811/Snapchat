import React, {Component} from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


export default class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    _onPressButton() {
        Alert.alert(
            'Develloped by OMGPROD!\n\n' +
            'Please report any bugs..\n\n' +
            'contact : omg-prod@live.fr\n\n' +
            'Thanks to Soso & Youyou!'
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={{position: 'absolute', left: 60, right: 0, top: 40}}>
                    <Text>La Piraterie ne seras donc jamais fini ?!</Text>
                </View>
                <Image source={require('../assets/logo.png')} style={{width: 193, height: 110}}/>
                <Text style={styles.Title}>My SnapChat.</Text>

                <TouchableOpacity
                    style={styles.buttonIn}
                    onPress={() =>
                        navigate('Inscription')}
                >
                    <Text style={styles.menu}> Inscription </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonCo}
                    onPress={() =>
                        navigate('Connection')}
                >
                    <Text style={styles.menu}> Connection </Text>
                </TouchableOpacity>


                <View style={{position: 'absolute', left: 0, right: 0, bottom: 10}}>
                    <Button
                        onPress={this._onPressButton}
                        title="Crédits"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF00',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Title: {
      fontSize: 40,
      textColor: "black",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },

    menu: {
        fontSize: 40,
        color: "white",
    },

    buttonIn: {
        marginTop: 150,
        fontSize: 20,
        textColor: "white",
        width: "100%",
        height: "10%",
        alignItems: 'center',
        backgroundColor: '#29a5dd',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25
    },

    buttonCo: {
        fontSize: 20,
        width: "100%",
        height: "10%",
        alignItems: 'center',
        backgroundColor: '#dd353f',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25
    },

});
