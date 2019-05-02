import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Validation from '../../utils/Validation';
import { setItem } from '../../utils/storage';
import api from '../../utils/api';
import { colors } from '../../styles';

class LoginForm extends React.Component {
  state = { isEmailSent: false, error: null };

  login = ({ email, password }) =>
    this.props.login({ email, password }).catch(error => {
      if (error.response.status === 401) {
        throw new SubmissionError({ email: 'invalid username or password' });
      }
    });

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Field name="email" component={Input} label="email" />
        </View>
        <View style={styles.passwordInput}>
          <Field name="password" component={Input} label="password" secureTextEntry />
        </View>
        <Button
          containerStyle={styles.loginBtn}
          textStyle={styles.loginTxt}
          onPress={this.props.handleSubmit(this.login)}
        >
          Log in
        </Button>
        <View style={styles.forgotPassBtn}>
          <TouchableHighlight>
            <Text style={styles.forgotPassTxt}>forgot password</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const validate = values =>
  new Validation(values)
    .require('email', 'Please enter your email address')
    .require('password', 'Please enter your password')
    .validEmail('email', 'Please enter a valid email address')
    .getErrors();

export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  loginBtn: {
    marginTop: 30
  },
  loginTxt: {
    fontSize: 20
  },
  passwordInput: {
    marginTop: 20
  },
  forgotPassBtn: {
    alignItems: 'center',
    marginTop: 20
  },
  forgotPassTxt: {
    color: colors.primary,
    fontSize: 16
  }
});
