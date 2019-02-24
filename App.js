import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import App from './src/App';

export default class whatdouc_native extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('whatdouc_native', () => whatdouc_native);
