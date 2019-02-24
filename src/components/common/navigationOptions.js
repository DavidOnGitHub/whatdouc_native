import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles';

export const commonNavBar = (navigation) => ({
  headerLeft: (
    <TouchableHighlight style={styles.navigationBack} onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" color="white" size={25} />
    </TouchableHighlight>
  ),
  headerStyle: styles.navBar,
});

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.primary,
  },
  navigationBack: {
    marginLeft: 10
  },
});
