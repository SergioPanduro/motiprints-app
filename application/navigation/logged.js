import React from 'react'
import {NavigationActions, createStackNavigator, createDrawerNavigator} from 'react-navigation'
import MisAlbumes from '../screens/Albumes/MisAlbumes'
import Perfil from '../screens/Albumes/Perfil'
import Logout from '../screens/Logout'
import Icon from 'react-native-vector-icons/FontAwesome'

const navigationOptions = {
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#ffffff',
		},
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center',
			fontSize: 20,
			color: '#000000',
			fontWeight: 'bold'
		}
	}
}

const leftIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={20}
	color="#000000"
	onPress={() => navigation.openDrawer()}
/>;

const logoutScreenStack = createStackNavigator({
    LogoutScreen: {
        screen: Logout,
        navigationOptions: ({navigation}) => ({
            title: 'Cerrar sesión'
        })
    }
})

const albumScreenStack = createStackNavigator({
		MisAlbumes: {
            screen: MisAlbumes,
            navigationOptions: ({navigation}) => ({
                title: 'Mis álbumes',
                headerLeft: leftIcon(navigation, 'bars'),
            })
		}
    },
    navigationOptions
)

const perfilScreenStack = createStackNavigator({
    Perfil: {
        screen: Perfil,
        navigationOptions: ({navigation}) => ({
            title: 'Mi perfil',
            headerLeft: leftIcon(navigation, 'bars'),
        })
    }
},
    navigationOptions
)

export default createDrawerNavigator(
    {
        PerfilScreen: {
            screen: perfilScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Mi perfil',
                drawerIcon: ({tintColor}) => (<Icon name="user" size={20} style={{color: tintColor}} />),
            })
        },
        AlbumScreen: {
            screen: albumScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Mis álbumes',
                drawerIcon: ({tintColor}) => (<Icon name="clone" size={20} style={{color: tintColor}} />),
            })
        },
        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Cerrar sesión',
                drawerIcon: ({tintColor}) => (<Icon name="sign-out" size={20} style={{color: tintColor}} />),
            })
        }
    },
	{
		drawerBackgroundColor : '#6ea9ff',
		contentOptions: {
			activeTintColor: '#f980ba',
			activeBackgroundColor : '#00cfff',
			inactiveTintColor : '#ffffff',
			itemsContainerStyle: {
				marginVertical: 0,
			}
		}
	}
)