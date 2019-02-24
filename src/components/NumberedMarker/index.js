import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';

class NumberedMarker extends React.Component {
  render() {
    const { setRef, number, children, ...otherProps } = this.props;
    return (
      <Marker ref={setRef} {...otherProps}>
        {number > 1 ? (
          <Image
            style={styles.pinWithNumber}
            source={require('../../assets/icons/pin-with-number.png')}
          />
        ) : (
          <Image
            style={styles.pinWithoutNumber}
            source={require('../../assets/icons/pin-without-number.png')}
          />
        )}
        {number > 1 && (
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{number}</Text>
          </View>
        )}
        {children}
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  numberContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinWithoutNumber: {
    height: 40,
    width: 28
  },
  pinWithNumber: {
    height: 40,
    width: 32
  },
  number: {
    fontWeight: '800',
    paddingBottom: 8
  }
});

export default NumberedMarker;
