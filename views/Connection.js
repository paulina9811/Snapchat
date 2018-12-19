import React, {Component} from 'react';
import axios from 'axios';
import {
    Alert,
    AsyncStorage,
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import global from "../global";

export default class Connection extends Component {
    constructor() {
        super()
        this.state = {
            email: null,
            password: null,
            loading: false,
            message: "",
            token: ""
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        console.log(this.state.email);
        console.log(this.state.password);

        if (this.state.email == null || this.state.password == null){
            Alert.alert("Rentrer un email et un Mot de passe valide");
        } else if (this.state.email == " " || this.state.password == " "){
            Alert.alert("Rentrer un email et un Mot de passe valide");
        }else {
            axios.post(`https://api.snapchat.wac.epitech.eu/connection`, {
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                console.log(res.data.data['token'] );
                if (res.data.data['token'] != null){
                    try {
                        AsyncStorage.setItem('token', JSON.stringify(res.data.data['token']));
                    } catch (error) {
                        console.log('SetItem :' + error.message);
                    }
                    AsyncStorage.getItem("token",globaly(res));
                    this.props.navigation.navigate('Home');
                }
            }).catch(error => {
                console.log('catch error : ' + error);
            });
        }
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
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{position: 'absolute', left: 0, right: 0, top: 40, marginTop: 20}}>
                    <Image source={require('../assets/logo.png')} style={{width: "100%", height: 110}}/>
                </View>


                <TextInput
                    style={{height: 50, borderColor: 'gray', borderWidth: 1, width: "100%", backgroundColor: "white", textAlign: "center"}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    placeholder={"Email"}
                    maxLength = {30}
                />

                <TextInput
                    style={{height: 50, borderColor: 'gray', borderWidth: 1, width: "100%", backgroundColor: "white", marginBottom: 50, textAlign: "center"}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder={"Mot de passe"}
                    maxLength = {40}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.buttonCo}
                    onPress={this.handleSubmit}>
                    <Text style={styles.menu}> Connection </Text>
                </TouchableOpacity>

                <View style={{position: 'absolute', left: 0, right: 0, bottom: 5}}>
                    <Button
                        onPress={() =>
                            navigate('Index')
                        }
                        title="Retour"
                    />
                    <Button
                        onPress={this._onPressButton}
                        title="Crédits"
                    />
                </View>
            </View>
        );
    }
}


var globaly = function (info){
    global.token = info
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF00',
        color: "black",
        alignItems: 'center',
        justifyContent: 'center',
    },

    menu: {
        fontSize: 40,
        color: "white",
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

