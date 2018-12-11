import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import LoggedStack from './logged'
import GuestStack from './guest'
import Preloader from '../components/Preloader'

class AuthLoadingScreen extends Component {
    constructor(){
        super()
        this._navigationAsync()
    }

    _navigationAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(userToken ? 'Logged' : 'Guest')
    }

    render() {
        return (
            <Preloader />
        )
    }
}

export default SwitchStack = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Guest: GuestStack,
        Logged: LoggedStack
    },
    {
        initialRouteName: 'AuthLoading',
        gesturesEnabled: false
    }
))