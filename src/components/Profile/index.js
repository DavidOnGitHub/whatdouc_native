import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { logout } from '../../actions/auth';
import Button from '../common/Button';
import { colors } from '../../styles';

class Profile extends React.Component {
  componentWillMount() {
    if (!this.props.isAuth) {
      this.props.navigation.navigate('Login');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAuth) {
      this.props.navigation.navigate('Login');
    }
  }
  logout = () => {
    this.props.dispatch(logout());
  };

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Button style={styles.logoutBtn} onPress={this.logout}>
          Logout
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutBtn: { backgroundColor: colors.mediumBlue }
});

export default connect(state => ({
  isAuth: !!state.auth.token
}))(Profile);
