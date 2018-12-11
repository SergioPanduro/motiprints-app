import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Preloader from './application/components/Preloader'
import SwitchStack from './application/navigation/switch'

console.disableYellowBox = true;

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true
    })
  }

  render() {
    const {loaded} = this.state;

    if (!loaded) {
      return (
        <Preloader />
      )
    }

    return (
      <SwitchStack />
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
