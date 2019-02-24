import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../styles';

const TargetOverlay = () => (
  <React.Fragment>
    <View style={styles.overlayHorizontal}>
      <View style={styles.lineHorizontal}/>
    </View>
    <View style={styles.overlayVertical}>
      <View style={styles.lineVertical}/>
    </View>
    <View style={styles.overlayCircle}>
      <View style={styles.circle} />
    </View>
  </React.Fragment>
);

const styles = StyleSheet.create({
  overlayHorizontal: {
    position: 'absolute',
    top: '50%',
    height: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  overlayVertical: {
    position: 'absolute',
    left: '50%',
    width: 0,
    height: '100%',
    justifyContent: 'center'
  },
  lineHorizontal: {
    width: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGrey,
  },
  lineVertical: {
    height: 60,
    borderRightWidth: 1,
    borderRightColor: colors.borderGrey,
  },
  overlayCircle: {
    position: 'absolute',
    left: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 0
  },
  circle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGrey,
  }
});

export default TargetOverlay;
