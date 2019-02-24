import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../common/NavBar';
import Button from '../common/Button';

class QuestionList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar>
          <Button
            title="ask"
            icon={<Icon name="question-answer" color="white" size={20} />}
            onPress={() => { this.props.navigation.navigate('EditQuestion')} }
          />
        </NavBar>
        <Text>vv</Text>
      </View>
    );
  }
}

export default QuestionList;

const styles = StyleSheet.create({
  container: { flex: 1 }
});
