import React, {Component} from 'react';
import axios from 'axios';
import {
    Alert,
    AppRegistry,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import global from "../global";

export default class Connection extends Component {
    constructor() {
        super()
        this.state = {
            image: "",
            snap: [],
            snap_id: null,
            token: "",
            status: [],
            duration: 5,
        }
    }

    componentDidMount() {
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
        }).catch(err => {
            console.log(err);
        })
    }

    SnapSelect(snap, dure) {
        this.setState({snap_id: snap});
        this.setState({duration: dure});
        return Alert.alert(snap + " selectionné pour la lecture du snapchat");
    }

    // Show Snap , Duration
    SnapDownload(snap) {
        axios({
            method: 'get',
            url: 'https://api.snapchat.wac.epitech.eu/snap/' + snap,
            headers: {
                'Content-Type': 'application/json',
                'token': global.token.data.data['token'],
            }
        }).then(res => {
            console.log(res.request.responseURL);
            const newSnap = res.request.responseURL;
            this.setState({image: newSnap});
            setTimeout(() => {
                this.setState({image: ""});
                this.DeleteSnap(snap);
            }, this.state.duration * 1000);
        }).catch(err => {
            console.log(err);
        })
    }

    // Delete Snap after show
    DeleteSnap(id) {
        console.log(id);
        axios.post('https://api.snapchat.wac.epitech.eu/seen', {"id": id}, {
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        }).then(() => {
            console.log('supression réussi');
        }).catch(err => {
            console.log(err);
        });
        axios({
            method: 'get',
            url: 'https://api.snapchat.wac.epitech.eu/snaps',
            headers: {
                'Content-Type': 'application/json',
                'token': global.token.data.data['token'],
            }
        })
        this.forceUpdate(this.componentDidMount);
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.state.image ?
                    <Image style={{
                        marginTop: 50,
                        width: 300,
                        height: 300,
                        borderColor: "black",
                        borderWidth: 2
                    }} source={{uri: this.state.image}}/> : null}

                <View style={styles.container}>
                    <View style={{position: 'absolute', left: 5, right: 0, top: 40, marginBottom: 10}}>
                        <TouchableOpacity onPress={() => {
                            global.token.data.data.token = null;
                            navigate('Connection');
                        }}><Text> Déconnexion </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{position: 'absolute', right: 5, top: 40, marginBottom: 10}}>
                        <TouchableOpacity onPress={() => {
                            navigate('Home');
                        }}><Text> Home </Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.snap ? <Text style={{marginTop: 50, fontSize: 15}}>Snaps Reçus :</Text> : null}

                    <ScrollView style={styles.bodyContent}>
                        {this.state.snap.map((item) =>
                            <Text style={{textAlign: "center"}} onPress={() => {
                                this.SnapSelect(item.snap_id, item.duration)
                            }} key={item.id}>N# {item.snap_id} | De : {item.from} | Durée : {item.duration}sec</Text>,
                        )}</ScrollView>

                    {this.state.snap_id ?
                        <TouchableOpacity
                            style={styles.buttonIn}
                            onPress={() =>
                                this.SnapDownload(this.state.snap_id)
                            }>
                            <Text style={styles.menu}>Ouvrir Snap #{this.state.snap_id}</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        );
    }
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

    bodyContent: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 50,
        backgroundColor: '#FFF',
        borderColor: "black",
        borderWidth: 2,
        textAlign: "center",
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },

    buttonIn: {
        fontSize: 20,
        width: "100%",
        height: "10%",
        marginBottom: 20,
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

