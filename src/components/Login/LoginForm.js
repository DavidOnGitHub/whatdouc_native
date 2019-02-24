import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import Validation from '../../utils/Validation';

import Input from '../common/Input';
import Button from '../common/Button';

class LoginForm extends React.Component {

  render() {
    const containerStyle = StyleSheet.flatten([styles.container, this.props.style]);
    return (
      <View style={containerStyle}>
        <View style={styles.login}>
          <Text style={styles.loginText}>Login</Text>
        </View>
        <Field
          name="username"
          label="Email"
          component={Input}
          style={styles.input}
        />
        <Field
          name="password"
          label="Password"
          component={Input}
          style={styles.input}
        />
        <Button style={styles.loginBtn} onPress={this.props.handleSubmit(this.props.login)}>
          <Text style={styles.loginText}>Go</Text>
        </Button>
        <View style={styles.forgotPass}>
          <Text style={styles.forgotPassText}>Forgot password?</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {  },
  loginBtn: {
    flexGrow: 80,
    borderWidth: 1,
    borderRadius: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  login: { flexGrow: 40, alignItems: 'center', justifyContent: 'center' },
  loginText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  forgotPass: { flexGrow: 60, alignItems: 'center', justifyContent: 'center' },
  forgotPassText: { color: 'white' },
  input: { flexGrow: 40 }
});

const validate = values => new Validation(values)
  .require('username', 'Please enter your email.')
  .require('password', 'Please enter your password.')
  .validEmail('username', 'Please enter a valid email.')
  .getErrors();

export default connect()(reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm));
