import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Callout as MapCallout } from 'react-native-maps';
import { colors } from '../../styles';

class Callout extends React.Component {
  render() {
    const data = this.props.children;

    if (Array.isArray(data)) {
      return (
        <MapCallout>
          { data.map(({ display, onPress }, index) => {
            if (display instanceof React.Component) {
              return (
                <TouchableHighlight key={index} onPress={onPress}>
                  <View
                    style={[styles.listItem, index === 0 && styles.firstItem]}
                  >
                    {display}
                  </View>
                </TouchableHighlight>
              );
            }
            return (
              <TouchableHighlight key={index} onPress={onPress}>
                <View
                  style={[styles.listItem, index === 0 && styles.firstItem]}
                  onPress={onPress}
                >
                  <Text style={styles.text}>{display}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </MapCallout>
      );
    }

    if (data.display instanceof React.Component) {
      return <MapCallout onPress={data.onPress}><View style={[styles.listItem, styles.firstItem]}>{data.display}</View></MapCallout>;
    }
    return <MapCallout onPress={data.onPress}><View style={[styles.listItem, styles.firstItem]}><Text style={styles.text}>{data.display}</Text></View></MapCallout>;
  }
}

const styles = StyleSheet.create({
  listItem: {
    minWidth: 100,
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    paddingVertical: 5
  },
  firstItem: {
    borderTopWidth: 0
  }
  // container: {
  //   alignItems: 'center'
  // },
  // bubble: {
  //   width: 200,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   backgroundColor: 'white'
  // },
  // arrow: {
  //   borderTopWidth: 16,
  //   // borderBottomWidth: 16,
  //   borderLeftWidth: 10,
  //   borderRightWidth: 10,
  //   borderColor: 'transparent',
  //   borderTopColor: 'black'
  // },
  // arrowBorder: {
  //   top: 10,
  //   borderTopWidth: 17,
  //   borderLeftWidth: 10,
  //   borderRightWidth: 10,
  //   borderColor: 'transparent',
  //   borderTopColor: 'black'
  // },
});

export default Callout;
