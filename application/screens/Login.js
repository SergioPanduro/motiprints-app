import React, {Component} from 'react'
import {StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions, AsyncStorage, Alert} from 'react-native'
import {LinearGradient} from 'expo'
import {TextInput, Button} from 'react-native-paper'
import Toast from 'react-native-root-toast'
import {NavigationActions} from 'react-navigation'
import {URL} from '../utils/server'

const {width} = Dimensions.get('window')

export default class Login extends Component {

	constructor() { 
        super()
        
        this.state = {
            email: '',
            password: '',
            validEmail: {isValid: false, message: ''},
            validPassword: {isValid: false, message: ''}
		}
	}

    async _validations() {
        let emailRule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!this.state.email) {
            this.setState({validEmail: {isValid: false, message: 'Debes agregar un email'}})
        } else if (!emailRule.test(this.state.email)) {
            this.setState({validEmail: {isValid: false, message: 'El email es invalido'}})
        } else {
            this.setState({validEmail: {isValid: true, message: ''}})
        }

        if (!this.state.password) {
            this.setState({validPassword: {isValid: false, message: 'Debes agregar una contraseña'}})
        } else {
            this.setState({validPassword: {isValid: true, message: ''}})
        }

        let validForm = await this._validate()

        return validForm

    }

    _validate() {
        if (
            this.state.validEmail.isValid &&
            this.state.validPassword.isValid
        ) {
            return true
        } else {
            return false
        }
    }

    _storeData = async (token) => {
        try {
            await AsyncStorage.setItem('userToken', JSON.stringify(token))
        } catch (error) {
            
            console.log(error)
        }
    }

    login() {
        Alert.alert('Cargando...', 'Espere un momento.', [{text: '',}])
        
        isOk = this._validations()

        if (isOk) {
            fetch(`${URL}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    if (response.ok === true) {
                        console.log(JSON.parse(response._bodyText).token)
                        this._storeData(JSON.parse(response._bodyText).token)
                        this.props.navigation.navigate('Logged')
                        Alert.alert('', 'Bienvenido a Motiprints', [{text: 'Aceptar',}])
                    }
                    if (response.ok === false) {
                        Alert.alert('Error', JSON.parse(response._bodyText).err.message, [{text: 'Aceptar',}])
                    }
                })
                .catch(error => {
                    console.log(error)
                    Toast.show('Error de conexión, intentalo más tarde', {
                        duration: Toast.durations.LONG,
                        hideOnPress: true,
                    })
                })
        } else {
            Alert.alert('Error', 'Llene los campos correctamente', [{text: 'Aceptar',}])
        }
    }

	render () {
		return (
			<LinearGradient
                colors={['#00cfff', '#6ea9ff', '#a194d3']}
                style={[styles.background]}
                start={[1,0]}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={80}
                >
                    <ScrollView
                        keyboardShouldPersistTaps={'always'}
                        removeClippedSubviews={false}
                    >

                        <TextInput
                            underlineColor='#fff'
                            style={styles.inputContainerStyle}
                            label="Email"
                            placeholder="Escribe tu email"
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                        />

                        <TextInput
                            underlineColor='#fff'
                            style={styles.inputContainerStyle}
                            label="Contraseña"
                            placeholder="Escribe tu contraseña"
                            value={this.state.password}
                            onChangeText={password => this.setState({password})}
                            password={true}
                            secureTextEntry={true}
                        />

                        <Button
                            mode='contained'
                            onPress={this.login.bind(this)}
                            style={styles.btn}
                            color="#f0f0f0"
                            title=''
                        >
                            Iniciar sesión
                        </Button>
                    </ScrollView>
                </KeyboardAvoidingView>
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    btn: {
        marginTop: 10,
        height: 50,
        justifyContent: 'center',
    },
    inputContainerStyle: {
        width: width - 20,
        backgroundColor: 'transparent',
    },
    top: {
        marginTop: 15
    },
    text: {
        color: 'red'
    }
})
