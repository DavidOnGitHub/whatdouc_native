import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import AnswerCard from './AnswerCardContainer';

class AnswerList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Answers:</Text>
        <FlatList
          data={this.props.answers}
          renderItem={({ item }) => <AnswerCard answer={item} queryVariables={this.props.queryVariables} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    paddingBottom: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
});

export default AnswerList;
