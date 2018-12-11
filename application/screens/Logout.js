import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native'
import {NavigationActions} from 'react-navigation';

export default class Logout extends Component {

    _clearStorage = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Guest')
    }

	render () {
        this._clearStorage()
		return null
	}
}