import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';
import api from '../utils/api';
import Validation from '../utils/Validation';
import { updateUser } from '../actions/auth';
import { getRandomNickname } from '../config/appConfig';
import Input from './common/Input';
import Button from './common/Button';
import ChooseImageSource from './common/ChooseImageSource';

import ImagePicker from 'react-native-image-crop-picker';

class SetProfile extends React.Component {
  state = { profilePhoto: null, showImageChooser: false };
  submit = async form => {
    try {
      const payload = { nickname: form.nickname };

      if (this.state.profilePhoto) {
        console.log(this.state.profilePhoto);
        const photo = {
          uri: this.state.profilePhoto.path,
          type: this.state.profilePhoto.mime,
          name: this.state.profilePhoto.filename
        };
        const { documentId } = await api.uploadDocuments([photo]);
        await this.props.dispatch(updateUser({ profilePhoto: documentId }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  suggestNickname = async () => {
    try {
      const name = this.props.user.email
        ? this.props.user.email
        : getRandomNickname();
      const { suggestedName } = await api.suggestNickname({ name });
      this.props.dispatch(change('SetProfileForm', 'nickname', suggestedName));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const imageSource = this.state.profilePhoto
      ? { uri: this.state.profilePhoto.path }
      : this.props.user && this.props.user.profilePhoto
        ? { uri: this.props.user.profilePhoto.uri }
        : require('../assets/images/defaultProfilePhoto.png');
    return (
      <View style={styles.container}>
        <Text>Please choose a unique nick name.</Text>
        <Field component={Input} name="nickname" />
        <Button onPress={this.suggestNickname}>Suggest</Button>
        <TouchableHighlight
          onPress={() => this.setState({ showImageChooser: true })}
        >
          <Image source={imageSource} style={styles.profilePhoto} />
        </TouchableHighlight>
        <Button onPress={this.submit}>Next</Button>
        <ChooseImageSource
          visible={this.state.showImageChooser}
          hide={() => this.setState({ showImageChooser: false })}
          onImageOpen={profilePhoto => this.setState({ profilePhoto })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { height: '100%' },
  profilePhoto: { width: 200, height: 200, borderRadius: 100 }
});

const validate = values =>
  new Validation(values)
    .require('nickname', 'Please enter a unique nickname')
    .getErrors();

const SetProfileForm = reduxForm({
  form: 'SetProfileForm',
  validate
})(SetProfile);

export default connect(state => ({
  user: state.auth.user
}))(SetProfileForm);
