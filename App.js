import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Index from './views/Index.js'
import Connection from './views/Connection.js';
import Inscription from './views/Inscription.js';
import Home from './views/Home.js';
import Snaps from './views/Snaps.js';
import { StackNavigator } from 'react-navigation';

const Navigation = StackNavigator({
    Index:{ screen:Index },
    Connection:{ screen: Connection },
    Inscription:{ screen:Inscription },
    Home:{ screen:Home },
    Snaps:{ screen:Snaps },
}, {
    initialRouteName: 'Index',
    headerMode: 'none'
});

export default class App extends Component {

    render() {

        return (
            <Navigation />

        );
    }
}

AppRegistry.registerComponent('Snap-React', ()  => App);