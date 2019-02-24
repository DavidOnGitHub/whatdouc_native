import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Validation from '../../utils/Validation';
import api from '../../utils/api';

class SignupForm extends React.Component {
  state = { emailSentTo: null };

  signUp = ({ email }) => {
    return api.register({ email }).then(
      () => this.setState({ emailSentTo: email }),
      error => {
        throw new SubmissionError({ email: error.response.data });
      }
    );
  };

  render() {
    return this.state.emailSentTo ? (
      <View style={styles.container}>
        <Text style={styles.emailSentMsg}>
          A temporary password has been sent to{' '}
          <Text style={styles.sentEmailTxt}>{this.state.emailSentTo}</Text>.
          Please check your email and change your password after logging in.
        </Text>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.emailInput}>
          <Field name="email" component={Input} label="email" />
        </View>
        <Button
          containerStyle={styles.signUpBtn}
          textStyle={styles.signUpBtnText}
          onPress={this.props.handleSubmit(this.signUp)}
        >
          Sign up
        </Button>
      </View>
    );
  }
}

const validate = values =>
  new Validation(values)
    .require('email', 'Please enter your email address')
    .validEmail('email', 'Please enter a valid email address')
    .getErrors();

export default reduxForm({
  form: 'SignupForm',
  validate
})(SignupForm);

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingLeft: 30,
    paddingRight: 30
  },
  signUpBtn: {
    marginTop: 40
  },
  signUpBtnText: {
    fontSize: 20
  },
  emailSentMsg: {
    fontSize: 18,
    lineHeight: 30
  },
  sentEmailTxt: {
    fontWeight: 'bold'
  }
});
