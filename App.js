import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Register from './application/screens/Register'
import Preloader from './application/components/Preloader'
import GuestNavigation from './application/navigation/guest'

console.disableYellowBox = true;

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      isLogged: false,
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({
      isLogged: false,
      loaded: true
    })
  }

  render() {
    const {isLogged, loaded} = this.state;

    return (
      <GuestNavigation />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
