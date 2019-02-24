import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles';

class Button extends React.Component {
  render() {
    const textStyle = StyleSheet.flatten([
      {
        fontSize: 20,
        color: 'white',
        paddingLeft: this.props.icon ? 30 : 0
      },
      this.props.textStyle
    ]);

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View
          style={StyleSheet.flatten([
            styles.container,
            this.props.containerStyle
          ])}
        >
          {this.props.icon && (
            <View style={styles.iconStyle}>{this.props.icon}</View>
          )}
          {typeof this.props.children === 'string' ? (
            <Text style={textStyle}>{this.props.children}</Text>
          ) : (
            this.props.children
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.borderGrey,
    borderRadius: 10,
    height: 50,
    backgroundColor: colors.primary
  },
  iconStyle: { position: 'absolute', left: 0 }
});

export default Button;
