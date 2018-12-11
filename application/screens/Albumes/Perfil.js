import React, {Component} from 'react'
import {View, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import {ImagePicker} from 'expo'

export default class Perfil extends Component {
    constructor(){
        super()
        this.state = {
            image: null
        }
    }
    
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            /* aspect: [3, 4], */
            exif: true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }
    
    render () {
        let {image} = this.state

        return (
            <View style={styles.background}>
                <TouchableOpacity onPress={this._pickImage}>
                    {
                        this.state.image ? 
                            <Image source={{uri: image}} style={{width: 200, height: 200, borderRadius:100}}/>
                        :
                            <Image source={require('../../../assets/images/user-blank.png')} style={{width: 200, height: 200, borderRadius:100}}/>
                    }
                </TouchableOpacity>
            </View>
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