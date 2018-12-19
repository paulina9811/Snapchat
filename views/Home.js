import React, {Component} from 'react';
import axios from 'axios';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    VibrationIOS,
    ImagePickerIOS,
    Image,
    ScrollView,
    View,
    TextInput,
} from 'react-native';
import global from "../global";

var c = 0;

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            image: null,
            email: [],
            to: "",
            token: "",
            status: [],
            duration: "10",
            snap: "",
            count: 0,
            send: 0,
            show: 1,
        };
    }

    componentDidMount() {
        // Fetch Users Email
        axios({
            method: 'get',
            url: 'https://api.snapchat.wac.epitech.eu/all',
            headers: {
                'Content-Type': 'application/json',
                'token': JSON.stringify(global.token.data.data['token']),
            }
        }).then(res => {
            const email = res.data.data;
            this.setState({token: global.token.data.data['token']});
            this.setState({email: email});
        }).catch(err => {
            console.log(err);
        });
        // Fetch Users Snaps
        axios({
            method: 'get',
            url: 'https://api.snapchat.wac.epitech.eu/snaps',
            headers: {
                'Content-Type': 'application/json',
                'token': global.token.data.data['token'],
            }
        }).then(res => {
            const snap = res.data.data;
            this.setState({token: global.token.data.data['token']});
            this.setState({snap: snap});
            this.setState({count: this.count(snap)});
        }).catch(err => {
            console.log(err);
        });
    }


    // Post Snap
    postPicture() {
        const wait = this.state.send;
        if(wait == 0){
            if(this.state.email == null){
                Alert.alert("Selectionner un destinaire.")
            }
            if(this.state.duration > 10 || this.state.duration < 1){
                Alert.alert("Durée max 10 secondes")
            } else {
                this.setState({send: 1})
                const uri = this.state.image;
                const formData = new FormData();
                formData.append("duration", this.state.duration);
                formData.append("to", this.state.to);
                formData.append('image', {
                    uri: uri,
                    type: 'image/jpeg',
                    name: 'image' + c + '.jpeg'
                });
                fetch('https://api.snapchat.wac.epitech.eu/snap', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'token': global.token.data.data['token'],
                    },
                    body: formData,
                }).then(res => {
                    const status = JSON.stringify(res);
                    this.setState({status: status});
                    VibrationIOS.vibrate();
                    Alert.alert("Snap  Envoyé");
                }).catch(err => {
                    console.log(err);
                }).done();
            }
            this.Timer();
            c++;
        }else if (wait === 1) {
            Alert.alert('Attendre 20 sec pour reposter.');
        }
        //Reload Snaps
        axios({
            method: 'get',
            url: 'https://api.snapchat.wac.epitech.eu/snaps',
            headers: {
                'Content-Type': 'application/json',
                'token': global.token.data.data['token'],
            }
        }).then(res => {
            const snap = res.data.data;
            this.setState({token: global.token.data.data['token']});
            this.setState({snap: snap});
            this.setState({count: this.count(snap)});
        }).catch(err => {
            console.log(err);
        });
        this.forceUpdate(this.componentDidMount);
    }

    // Timer Anti-Snap-Bomb
    Timer(){
        setTimeout(() => {
            this.setState({send: 0});
        }, 10 * 1000);
    }

    // Function count snap
    count(array) {
        var i = 0
        var count = 0;
        while (array[i] != undefined && i <= array.length + 1) {
            i++;
            if (typeof array[i] == undefined) continue;
            count++;
        }
        return count;
    }

    //Function Select image in gallery
    pickImage() {
        ImagePickerIOS.openSelectDialog({}, imageUri => {
            this.setState({image: imageUri});
        }, error => console.log(error));
    }

    // Function Select Users Email in Scroll View
    EmailSelect(mail){
        this.setState({to: mail});
        return Alert.alert(mail + " selectionné pour l'envoie de snapchat");
    }

    //Function Email Checker not functionnal at all !!!!!!
    checkerEmail(){
        const regex = /[^@]+@[^@]+\.[^@]+/;
        const users = new Array();
        this.state.email.map((item) => {
            console.log(regex.test(item.email))
            if (regex.test(item.email)){
                users.push(item.email);
                console.log(item.email);
            }
        });
        console.log(users);
        this.setState({email: users});
    }

    _CheckPicture(){
        this.setState({show: 0});
            setTimeout(() => {
                this.setState({show: 1});
            }, 3 * 1000);
        }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{position: 'absolute', left: 5, right: 0, top: 40, marginBottom: 10}}>
                    <TouchableOpacity onPress={() => {
                        global.token.data.data.token = null;
                        navigate('Connection');
                    }}><Text> Déconnexion </Text>
                    </TouchableOpacity>
                </View>
                {this.state.image ?
                <View style={{position: 'absolute', right: 5, top: 40, marginBottom: 10}}>
                    <TouchableOpacity onPress={() =>
                        this._CheckPicture()}>
                    <Text>Pre-visualiser</Text>
                    </TouchableOpacity>
                </View>: null}

                {this.state.show == 0 ?
                    <Image style={{ marginTop:150, width:300, height:300 }} source={{ uri: this.state.image }} />
                    : null}

                {this.state.image ?
                    <ScrollView style={styles.emailContainer} contentContainerStyle={{flexGrow: 1}}>
                        {this.state.email.map((item) =>
                            <Text style={{textAlign: "center"}} onPress={() => {
                                this.EmailSelect(item.email);
                            }} key={item.email}>{item.email}</Text>,
                        )}</ScrollView> : null}

                {this.state.image ?
                    <TextInput
                        style={{height: 60, borderColor: 'gray', borderWidth: 1, width: "60%", backgroundColor: "white", textAlign: "center", marginBottom: 10}}
                        onChangeText={(duration) => this.setState({duration})}
                        value={this.state.duration}
                        placeholder={"Durée"}/> : null}

                {this.state.image ?
                    <TouchableOpacity
                        style={styles.buttonSend}
                        onPress={() => {
                            this.postPicture();
                            VibrationIOS.vibrate();
                        }}>
                        <Text style={styles.menu}>
                            ENVOYER SNAP
                        </Text>
                    </TouchableOpacity> : null}


                <TouchableOpacity
                    style={styles.buttonCo}
                    onPress={() =>
                        navigate('Snaps')
                    }>
                    <Text style={styles.menu}>Snaps Reçus {this.state.count}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonIn}
                    onPress={() => {
                        this.pickImage();
                    }}>
                    <Text style={styles.menu}>Choisir un Snap</Text>
                </TouchableOpacity>

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

    emailContainer: {
        fontSize: 20,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 100,
        marginBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        alignSelf: "center",
        alignment: 'center',
        textAlign: "center",
        alignItems: 'center',
        shadowColor: '#000000',
        backgroundColor: '#FFF',
        borderColor: "black",
        borderWidth: 2,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },

    Title: {
        fontSize: 20,
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
        marginTop: 5,
        bottom: 20,
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

    buttonSend: {
        marginTop:20,
        bottom: 20,
        fontSize: 20,
        textColor: "white",
        width: "85%",
        height: 80,
        alignItems: 'center',
        backgroundColor: '#bfd4dd',
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
        marginBottom: 20,
        fontSize: 20,
        width: "100%",
        height: "10%",
        alignItems: 'center',
        backgroundColor: '#dd353f',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25
    },

});

