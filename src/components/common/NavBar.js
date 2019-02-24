import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class NavBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        { this.props.children }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#42b0f4'
  }
});

export default NavBar;
