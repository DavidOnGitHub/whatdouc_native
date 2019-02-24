import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { reduxForm, Field } from 'redux-form';

import Validation from '../../utils/Validation';
import { register } from '../../actions/auth';
import { colors } from '../../styles';
import Button from '../common/Button';
import Input from '../common/Input';

class Register extends React.Component {
  state = { emailSent: false, asyncError: null }

  register = (form) => {
    this.props.dispatch(register(form.email)).then(() => this.setState({ emailSent: true }), (errorStatus) => {
      if (errorStatus === 409) {
        this.setState({ asyncError: 'This email has already been registered.' });
      } else {
        console.error(`Error happened with status ${errorStatus}`);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.registerTxt}>Register</Text>
        <Field
          name="email"
          component={Input}
          uiStyle="bright"
          style={styles.emailInput}
        />
        {this.state.emailSent &&
         <Text>An email has been sent to you with a temporary password.</Text>
        }
        {this.state.asyncError && <Text>{this.state.asyncError}</Text>}
        <Button style={styles.registerBtn} onPress={this.props.handleSubmit(this.register)}>Register</Button>
        {/* <Button onPress={() => this.props.navigation.navigate('Login')}>back to login</Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  registerTxt: {
    alignSelf: 'center',
  },
  registerBtn: {
    width: 200,
    marginTop: 20,
    backgroundColor: colors.mediumBlue,
    alignSelf: 'center',
  }
});

const validate = values => new Validation(values)
  .require('email', 'Please enter your email address')
  .validEmail('email', 'Please enter a valid email address')
  .getErrors();

export default connect()(reduxForm({
  form: 'RegisterForm',
  validate
})(Register));
