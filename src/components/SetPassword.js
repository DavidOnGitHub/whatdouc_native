import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { View, Text, StyleSheet } from 'react-native';
import Validation from '../utils/Validation';
import { setPassword, login } from '../actions/auth';
import { loading } from '../actions/ui';
import Input from './common/Input';
import Button from './common/Button';
import Loader from './common/Loader';

class SetPassword extends React.Component {
  setPassword = async (form) => {
    this.props.dispatch(loading(true));
    try {
      const user = await this.props.dispatch(setPassword(form.password, this.props.navigation.state.params.activationCode));
      await this.props.dispatch(login(user.username, form.password));
      this.props.navigation.navigate('SetProfile');
      this.props.dispatch(loading(false));
    } catch (error) {
      this.props.dispatch(loading(false));
    }
  }

  render() {
    return (
      <View>
        <Loader visible={this.props.loading}/>
        <Text>Password</Text>
        <Field name="password" secureTextEntry component={Input} />
        <Button onPress={this.props.handleSubmit(this.setPassword)}>Submit</Button>
      </View>
    );
  }
}

const validate = values => new Validation(values)
  .require('password', 'Please enter password')
  .validPassword('password', 'Password should be at least 8 characters')
  .getErrors();

const ActivationForm = reduxForm({
  form: 'ActivationFrom',
  validate
})(SetPassword);

export default connect(state => ({
  loading: state.ui.loading
}))(ActivationForm);
