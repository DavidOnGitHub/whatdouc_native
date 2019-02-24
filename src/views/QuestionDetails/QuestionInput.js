import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import QuestionForm from '../../components/QuestionForm';
import { showToast } from '../../utils/toast';

class QuestionInput extends React.Component {
  saveQuestion = async ({ subject, content }) => {
    const question = { subject, content };
    try {
      await this.props.saveQuestion({ variables: { questionId: this.props.question._id, question } });
      this.props.navigation.setParams({ isEditingQuestion: false });
      showToast('Question updated successfully.');
      this.props.navigation.goBack();
    } catch (error) {
      if (error.graphQLErrors && error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
        this.props.navigation.navigate('Login');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <QuestionForm
          setSubmitMethod={submitMethod => this.props.navigation.setParams({ saveQuestion: submitMethod })}
          submitAction={this.saveQuestion}
          initialValues={this.props.question}
        />
        <View style={styles.actions}>
          <TouchableHighlight style={styles.btn} onPress={this.props.cancelEdit}>
            <Text>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn} onPress={this.saveQuestion}>
            <Text>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  actions: {
    flexDirection: 'row',
  },
  btn: {
    padding: 5,
  },
});

export default QuestionInput;
