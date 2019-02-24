import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { showToast } from '../../utils/toast';
import QuestionForm from '../../components/QuestionForm';
import { commonNavBar } from '../../components/common/navigationOptions';

const styles = StyleSheet.create({
  sendBtn: {
    marginRight: 20
  },
});

class AddQuestion extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...commonNavBar(navigation),
    headerRight: (
      <TouchableHighlight onPress={navigation.getParam('postQuestion')} style={styles.sendBtn}>
        <Icon name="navigation" color="white" size={20} />
      </TouchableHighlight>
    ) })

  postQuestion = async ({ subject, content }) => {
    const location = this.props.navigation.getParam('location');
    const question = {
      subject,
      content,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      }
    };

    try {
      await this.props.postQuestion({ variables: { question } });
      showToast('Question added successfully.');
      this.props.navigation.goBack();
    } catch(error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const { code } = error.graphQLErrors[0].extensions;
        if (code === 'UNAUTHENTICATED') {
          console.log(this.props.navigation.state);
          this.props.navigation.navigate('Login', this.props.navigation.state);
        }
      }
    }
  };

  render() {
    return (
      <QuestionForm
        setSubmitMethod={submitMethod => this.props.navigation.setParams({ postQuestion: submitMethod })}
        submitAction={this.postQuestion}
      />
    );
  }
}

export default AddQuestion;
