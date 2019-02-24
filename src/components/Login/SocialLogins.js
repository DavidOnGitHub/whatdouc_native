import React from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { facebookLogin } from '../../actions/auth';
import { loading } from '../../actions/ui';
import Button from '../common/Button';

class SocialLogins extends React.Component {
  facebookLogin = async () => {
    try {
      this.props.dispatch(loading(true));
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (!result.isCancelled && result.token) {
        await this.props.dispatch(facebookLogin(result.token));
      }
      this.props.dispatch(loading(false));
    } catch(error) {
      this.props.dispatch(loading(false));
      console.log(error);
    }
  }

  render() {
    const containerStyle = StyleSheet.flatten([styles.container, this.props.style]);
    return (
      <View style={containerStyle}>
        <Button
          style={styles.btn}
          textStyle={styles.btnText}
          icon={<Image style={styles.icon} source={require('../../assets/icons/facebook.png')} />}
          onPress={this.facebookLogin}
        >Facebook</Button>
        <Button
          style={styles.btn}
          textStyle={styles.btnText}
          icon={<Image style={styles.icon} source={require('../../assets/icons/google.png')} />}
        >
          Google
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  btn: { flexGrow: 1 },
  icon: { width: 30, height: 30 },
  btnText: { fontSize: 16 }
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(SocialLogins);
