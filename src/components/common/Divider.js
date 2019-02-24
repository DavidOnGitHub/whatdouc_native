import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const Divider = () => {
  return <View style={styles.main} />;
};

const styles = StyleSheet.create({
  main: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: Dimensions.get('window').width
  }
});

export default Divider;
