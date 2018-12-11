import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Image} from 'react-native'
import {LinearGradient} from 'expo'
import {NavigationActions} from 'react-navigation'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

const {width} = Dimensions.get('window')

export default class Start extends Component {

    register () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		this.props.navigation.dispatch(navigateAction);
    }
    
    loginEmail () {
        const navigateAction = NavigationActions.navigate({
			routeName: 'Login'
		});
		this.props.navigation.dispatch(navigateAction);
    }
    //TODO: Agregar metodos async de login con redes sociales

    

	render () {
		return (
            <LinearGradient
                colors={['#00cfff', '#6ea9ff', '#a194d3']}
                style={[styles.background]}
                start={[1,0]}
            >
                <View style={[styles.background]} >

                    <Image 
                        source={require('../../assets/images/loginLogo.png')}
                        style={{marginBottom: 30}}    
                    />

                    <Button
                        mode='contained'
                        icon={({}) => (
                            <Icon
                                name={'envelope'}
                                size={15}
                                color={"#6ea9ff"}
                            />
                        )}
                        onPress={this.loginEmail.bind(this)}
                        style={styles.btn}
                        color="#fff"
                    >
                        Inicia sesión con tu email
                    </Button>
                    <Button
                        mode='contained'
                        icon={({size}) => (
                            <Image
                            source={require('../../assets/images/googleLogo.png')}
                            style={{ width: size + 5, height: size + 5 , marginRight: 5 }}
                            />
                        )}
                        onPress={() => {}}
                        style={styles.btn}
                        color="#fff"
                    >
                        Inicia sesión con Google
                    </Button>
                    <Button
                        mode='contained'
                        icon={({size}) => (
                            <Image
                            source={require('../../assets/images/facebookLogo.png')}
                            style={{ width: size + 5, height: size + 5 , marginRight: 5 }}
                            />
                        )}
                        onPress={() => {}}
                        style={styles.btn}
                        color="#fff"
                    >
                        Inicia sesión con Facebook
                    </Button>
                    <Button
                        mode='contained'
                        icon={({size}) => (
                            <Image
                            source={require('../../assets/images/instagramLogo.png')}
                            style={{ width: size + 5, height: size + 5 , marginRight: 5 }}
                            />
                        )}
                        onPress={() => {}}
                        style={styles.btn}
                        color="#fff"
                    >
                        Inicia sesión con Instagram
                    </Button>
                    <Button
                        color="#fff"
                        onPress={this.register.bind(this)}
                        style={styles.btn}
                    >
                        ¿No tienes cuenta? Regístrate
                    </Button>
                </View>
            </LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
    },
    btn: {
        marginTop: 10,
        height: 50,
        width: width - 40,
        justifyContent: 'center',
    }
})