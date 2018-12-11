import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Image, AsyncStorage} from 'react-native'
import {LinearGradient} from 'expo'
import {NavigationActions} from 'react-navigation'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

const {width} = Dimensions.get('window')

export default class MisAlbumes extends Component {
	render () {
		return (
            <View style={styles.background}></View>
		)
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0'
    }
})