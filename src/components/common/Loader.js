import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

class Loader extends React.Component {
  render() {
    if (!this.props.loading) return null;
    
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  loader: {
    height: 400
  }
});

export default Loader;
