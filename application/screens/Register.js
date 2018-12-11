import React, {Component} from 'react'
import {StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions, Linking, View, Alert} from 'react-native'
import {LinearGradient} from 'expo'
import {TextInput, Button, Checkbox, Paragraph, TouchableRipple} from 'react-native-paper'
import Toast from 'react-native-root-toast'
import {NavigationActions} from 'react-navigation'
import {URL} from '../utils/server'

const {width} = Dimensions.get('window')

export default class Register extends Component {

	constructor() { 
        super()
        
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            sPassword: '',
            politics: 'unchecked',
            validName: {isValid: false, message: ''},
            validLastname: {isValid: false, message: ''},
            validEmail: {isValid: false, message: ''},
            validPassword: {isValid: false, message: ''},
            validSPassword: {isValid: false, message: ''},
            validPolitics: {isValid: false, message: ''}
		}
	}

	createAccount() {

        isOk = this.validations()

        if (isOk) {
            fetch(`${URL}/register`, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    role: 'USER_ROLE'
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    if (response.ok === true) {
                        Alert.alert(
                            'Se creó tu cuenta',
                            'Muy pronto te llegará un mensaje de confirmación a tu cuenta de email. Confirma para continuar.',
                            [{
                                text: 'Aceptar',
                                onPress: () => {
                                    const navigateAction = NavigationActions.navigate({
                                        routeName: 'Start'
                                    })
                                    this.props.navigation.dispatch(navigateAction)
                                }
                            }]
                        )
                    }
                    if (response.ok === false) {
                        Toast.show('Error al crear la cuenta', {
                            duration: Toast.durations.LONG,
                            hideOnPress: true,
                        })
                    }
                    console.log(response)
                })
                .catch(error => {
                    Toast.show('Error de conexión, intentalo más tarde', {
                        duration: Toast.durations.LONG,
                        hideOnPress: true,
                    })
                })
        }
    }

    validations() {
        let emailRule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let nameRule = /^[A-Za-z\s]+$/

        if (!this.state.name) {
            this.setState({validName: {isValid: false, message: 'Debes agregar un nombre'}})
        } else if (!nameRule.test(this.state.name)) {
            this.setState({validName: {isValid: false, message: 'El nombre debe contener letras solamente'}})
        } else {
            this.setState({validName: {isValid: true, message: ''}})
        }

        if (!this.state.lastname) {
            this.setState({validLastname: {isValid: false, message: 'Debes agregar un apellido'}})
        } else if (!nameRule.test(this.state.lastname)) {
            this.setState({validLastname: {isValid: false, message: 'El apellido debe contener letras solamente'}})
        } else {
            this.setState({validLastname: {isValid: true, message: ''}})
        }

        if (!this.state.email) {
            this.setState({validEmail: {isValid: false, message: 'Debes agregar un email'}})
        } else if (!emailRule.test(this.state.email)) {
            this.setState({validEmail: {isValid: false, message: 'El email es invalido'}})
        } else {
            this.setState({validEmail: {isValid: true, message: ''}})
        }

        if (!this.state.password) {
            this.setState({validPassword: {isValid: false, message: 'Debes agregar una contraseña'}})
        } else if (this.state.password.length < 6) {
            this.setState({validPassword: {isValid: false, message: 'La contraseña debe contener al menos 6 caracteres'}})
        } else {
            this.setState({validPassword: {isValid: true, message: ''}})
        }

        if (!this.state.sPassword) {
            this.setState({validSPassword: {isValid: false, message: 'Debes repetir la contraseña'}})
        } else if (this.state.sPassword.length < 6) {
            this.setState({validSPassword: {isValid: false, message: 'La contraseña debe contener al menos 6 caracteres'}})
        } else if (this.state.password != this.state.sPassword) {
            this.setState({validSPassword: {isValid: false, message: 'Las contraseñas no coinciden'}})
        } else {
            this.setState({validSPassword: {isValid: true, message: ''}})
        }

        if (this.state.politics === 'unchecked') {
            this.setState({validPolitics: {isValid: false, message: 'Debes aceptar los términos y condiciones'}})
        } else {
            this.setState({validPolitics: {isValid: true}})
        }

        let validForm = this.validate()

        return validForm

    }

    validate = () => {
        if (this.state.validName.isValid &&
            this.state.validLastname.isValid &&
            this.state.validEmail.isValid &&
            this.state.validPassword.isValid &&
            this.state.validSPassword &&
            this.state.validPolitics
        ) {
            return true
        } else {
            return false
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
                            
                            style={[styles.inputContainerStyle, styles.top]}
                            label="Nombre(s)"
                            placeholder="Escribe tu nombre"
                            value={this.state.name}
                            onChangeText={name => this.setState({name})}
                        />
                        
                        {
                            !this.state.validName.isValid &&
                                <View 
                                    style={{alignItems: 'center'}}
                                >
                                    <Paragraph style={styles.text}>{this.state.validName.message}</Paragraph>
                                </View>
                        }
                        
                        <TextInput
                            underlineColor='#fff'
                            
                            style={styles.inputContainerStyle}
                            label="Apellido(s)"
                            placeholder="Escribe tu apellido"
                            value={this.state.lastname}
                            onChangeText={lastname => this.setState({lastname})}
                        />

                        {
                            !this.state.validLastname.isValid &&
                                <View 
                                    style={{alignItems: 'center'}}
                                >
                                    <Paragraph style={styles.text}>{this.state.validLastname.message}</Paragraph>
                                </View>
                        }

                        <TextInput
                            underlineColor='#fff'
                            style={styles.inputContainerStyle}
                            label="Email"
                            placeholder="Escribe tu email"
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                        />

                        {
                            !this.state.validEmail.isValid &&
                                <View 
                                    style={{alignItems: 'center'}}
                                >
                                    <Paragraph style={styles.text}>{this.state.validEmail.message}</Paragraph>
                                </View>
                        }

                        <TextInput
                            underlineColor='#fff'
                            style={styles.inputContainerStyle}
                            label="Contraseña"
                            placeholder="Contraseña (6 caracteres o más)"
                            value={this.state.password}
                            onChangeText={password => this.setState({password})}
                            password={true}
                            secureTextEntry={true}
                        />

                        {
                            !this.state.validPassword.isValid &&
                                <View 
                                    style={{alignItems: 'center'}}
                                >
                                    <Paragraph style={styles.text}>{this.state.validPassword.message}</Paragraph>
                                </View>
                        }

                        <TextInput
                            underlineColor='#fff'
                            style={styles.inputContainerStyle}
                            label="Confirmar contraseña"
                            placeholder="Repite la contraseña"
                            value={this.state.sPassword}
                            onChangeText={sPassword => this.setState({sPassword})}
                            password={true}
                            secureTextEntry={true}
                        />

                        {
                            !this.state.validSPassword.isValid &&
                                <View 
                                    style={{alignItems: 'center'}}
                                >
                                    <Paragraph style={styles.text}>{this.state.validSPassword.message}</Paragraph>
                                </View>
                        }

                        <TouchableRipple
                            onPress={() => {
                                if (this.state.politics === 'unchecked') {
                                    this.setState({politics: 'checked'})
                                }
                                if (this.state.politics === 'checked') {
                                    this.setState({politics: 'unchecked'})
                                }
                                this.setState({validPolitics: {visible: true}})
                            }}
                            >
                            <View style={styles.row}>
                                <Paragraph>Aceptar términos y condiciones</Paragraph>
                                <View pointerEvents="none">
                                <Checkbox
                                    color='#4A148C'
                                    status={this.state.politics}
                                />
                                </View>
                            </View>
                        </TouchableRipple>

                        {
                            !this.state.validPolitics.isValid &&
                                <View 
                                    style={{alignItems: 'center'}}
                                >
                                    <Paragraph style={styles.text}>{this.state.validPolitics.message}</Paragraph>
                                </View>
                        }

                        <Button
                            mode='contained'
                            onPress={this.createAccount.bind(this)}
                            style={styles.btn}
                            color="#f0f0f0"
                            title=''
                        >
                            Crear cuenta
                        </Button>
                        <Button
                            onPress={() => Linking.openURL('https://app.motiprints.com/_docs/aviso de privacidad motidigital.com.docx')}
                        >
                            Términos y condiciones
                        </Button>
                        <Button
                            onPress={() => Linking.openURL('https://app.motiprints.com/_docs/aviso de privacidad motidigital.com.docx')}
                        >
                            Política de privacidad
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
