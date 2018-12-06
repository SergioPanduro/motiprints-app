import React, {Component} from 'react'
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native'
import {LinearGradient} from 'expo'

const {height} = Dimensions.get('window')

export default class PreLoader extends Component {
	render () {
		return (
            <LinearGradient
                colors={['#00cfff', '#6ea9ff', '#a194d3']}
                style={[styles.preloader]}
                start={[1,0]}
                >
                <ActivityIndicator color="#fff" size="large" />
            </LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	preloader: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: height
	}
})