import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../../utils/api';

import { colors } from '../../styles';
import Loader from '../common/Loader';
import Divider from '../common/Divider';
import LoginForm from './LoginForm';
import SocialLogins from './SocialLogins';

import { setItem } from '../../utils/storage';

class Login extends React.Component {
  static navigationOptions = { header: null }

  login = async ({ username, password }) => {
    try {
      const { token, user } = await api.login({ username, password });
      setItem('token', token);
      setItem('user', user);
      this.props.navigation.navigate('app');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader visible={this.props.loading}/>
        <View style={styles.upperContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoTxt}>what do u c</Text>
          </View>
          <LoginForm style={styles.loginForm} login={this.login}/>
          <View style={styles.or}>
            <Text style={styles.orText}>or Continue with</Text>
          </View>
          <SocialLogins style={styles.socialLogins}/>
        </View>
        <Divider />
        <View style={styles.lowerContainer}>
          <View style={styles.signUp}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.terms}>By continuing, you agree to whatdouc's Terms of Service and Privacy Policy</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.primary, flex: 1 },
  upperContainer: { flex: 1, flexGrow: 420, paddingHorizontal: 50 },
  lowerContainer: { flex: 1, flexGrow: 120, paddingHorizontal: 50 },
  logo: { flexGrow: 60, justifyContent: 'center' },
  logoTxt: { fontSize: 30, color: 'white', textAlign: 'center' },
  loginForm: { flexGrow: 270 },
  or: { flexGrow: 40, justifyContent: 'center' },
  orText: { fontSize: 20, color: 'white', textAlign: 'center' },
  socialLogins: { flexGrow: 160 },
  signUp: { flexGrow: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signUpText: { color: 'white' },
  terms: { flexGrow: 20, color: 'white', fontSize: 12, textAlign: 'center' },
});

export default connect(state => ({
  auth: state.auth,
  isAuth: !!state.auth.token,
  loading: state.ui.loading
}))(Login);
