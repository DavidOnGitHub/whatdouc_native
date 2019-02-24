import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
import { colors } from '../../styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

export default class Login extends React.Component {
  state = {
    isLogin: false
  };

  render() {
    const { isLogin } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/icons/app-icon.png')}
        />
        <View style={styles.mainShadow}>
          <View style={styles.main}>
            <View style={styles.tabs}>
              <View style={[styles.tab, !isLogin && styles.activeTab]}>
                <TouchableOpacity
                  onPress={() => this.setState({ isLogin: false })}
                >
                  <Text style={[styles.tabText, !isLogin && styles.activeText]}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.tab, isLogin && styles.activeTab]}>
                <TouchableOpacity
                  onPress={() => this.setState({ isLogin: true })}
                >
                  <Text style={[styles.tabText, isLogin && styles.activeText]}>
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.form}>
              {this.state.isLogin ? <LoginForm /> : <SignupForm />}
            </View>
          </View>
        </View>
        <View style={styles.facebookLoginContainer}>
          <TouchableHighlight>
            <View style={styles.facebookLogin}>
              <Image
                style={styles.fbIcon}
                source={require('../../assets/icons/facebook.png')}
              />
              <View style={styles.fbBtn}>
                <Text style={styles.fbText}>Sign in with Facebook</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  mainShadow: {
    width: '90%',
    height: 350,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.7
  },
  main: {
    overflow: 'hidden',
    height: 350,
    borderRadius: 10
  },
  form: {
    height: '100%',
    width: '100%'
  },
  tabs: {
    flexDirection: 'row'
  },
  tab: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  activeTab: {
    backgroundColor: 'white'
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  activeText: {
    color: colors.primary
  },
  facebookLoginContainer: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20
  },
  facebookLogin: {
    flexDirection: 'row',
    height: 50
  },
  fbIcon: {
    height: '100%',
    width: 50,
    resizeMode: 'contain'
  },
  fbBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  fbText: {
    fontSize: 16,
    color: colors.primary
  }
});
