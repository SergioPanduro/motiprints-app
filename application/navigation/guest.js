import React from 'react'
import {createStackNavigator, createAppContainer} from "react-navigation"
import StartScreen from "../screens/Start"
/* import LoginScreen from "../screens/Login" */
import RegisterScreen from '../screens/Register'

const guestStack =  createStackNavigator(
	{
		Start: {
            screen: StartScreen,
            navigationOptions: () => ({
                header: null
            })
		},
		/* Login: {
			screen: LoginScreen
		},  */
		Register: {
			screen: RegisterScreen,
			navigationOptions: () => ({
                title: 'Crear una cuenta'
            })
		}
	},
	{
		initialRouteName: 'Start',
        gesturesEnabled: false
	}
)

export default createAppContainer(guestStack)