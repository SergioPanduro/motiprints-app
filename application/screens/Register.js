import React, {Component} from 'react'
import {StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions} from 'react-native'
import {LinearGradient} from 'expo'
import t from 'tcomb-form-native'
import FormValidation from '../utils/validations'
import {TextInput, Button, Headline} from 'react-native-paper'
const Form = t.form.Form
import Toast from 'react-native-root-toast'

const {width} = Dimensions.get('window')

export default class Login extends Component {

	constructor() {
        super()
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
        
	}

	login () {
        Toast.show('E'+this.state.email, {
            duration: Toast.durations.LONG,
            hideOnPress: true,
        })
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
                            style={styles.inputContainerStyle}
                            label="Nombre(s)"
                            placeholder="Escribe tu nombre"
                            value={this.state.name}
                            onChangeText={name => this.setState({name})}
                        />
                        <TextInput
                            style={styles.inputContainerStyle}
                            label="Apellido(s)"
                            placeholder="Escribe tu apellido"
                            value={this.state.surname}
                            onChangeText={surname => this.setState({surname})}
                        />
                        <TextInput
                            style={styles.inputContainerStyle}
                            label="Email"
                            placeholder="Escribe tu email"
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                        />
                        <TextInput
                            style={styles.inputContainerStyle}
                            label="Contraseña"
                            placeholder="Contraseña (6 caracteres o más)"
                            value={this.state.password}
                            onChangeText={password => this.setState({password})}
                            type='password'
                        />
                        <Button
                            mode='contained'
                            onPress={this.login.bind(this)}
                            style={styles.btn}
                            color="#f0f0f0"
                        >
                            Crear cuenta
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
    btn: {
        marginTop: 10,
        height: 50,
        justifyContent: 'center',
    },
    inputContainerStyle: {
        width: width - 20,
        backgroundColor: 'transparent',
    }
})
