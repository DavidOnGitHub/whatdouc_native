import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

class ChooseImageSource extends React.Component {
  openImage = open => async () => {
    try {
      const image = await open({
        cropping: true,
        cropperCircleOverlay: true
      });
      this.props.onImageOpen(image);
      this.props.hide();
    } catch (error) {
      this.props.hide();
    }
  }

  render() {
    return (
      <Modal visible={this.props.visible}
          backdropOpacity={0}
          onBackdropPress={this.props.hide}
          transparent
          animationType="slide"
          style={styles.modal}
      >
        <View style={styles.container}>
          <TouchableHighlight onPress={this.openImage(ImagePicker.openCamera)}>
            <Image source={require('../../assets/icons/camera.png')} style={styles.icon}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.openImage(ImagePicker.openPicker)}>
            <Image source={require('../../assets/icons/gallery.png')} style={styles.icon}/>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: { margin: 0 },
  container: {
    position: 'absolute',
    bottom: 0,
    height: 150,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  icon: {
    width: 80,
    height: 80
  }
});

export default ChooseImageSource;
