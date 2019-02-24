import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../components/common/Button';

const headerRight = (navigation) => {
  const isAddingAnswer = navigation.getParam('isAddingAnswer');
  const cancelAdd = navigation.getParam('cancelAdd');
  const addAnswer = navigation.getParam('addAnswer');
  const postAnswer = navigation.getParam('postAnswer');

  if (isAddingAnswer) {
    return (
      <View style={styles.btnSection}>
        <Button
          containerStyle={styles.btnContainer}
          textStyle={styles.btnTxt}
          onPress={cancelAdd}
        >
          Cancel
        </Button>
        <Button
          containerStyle={styles.btnContainer}
          textStyle={styles.btnTxt}
          onPress={postAnswer}
        >
          Post
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.btnSection}>
      <Button
        containerStyle={styles.btnContainer}
        textStyle={styles.btnTxt}
        onPress={addAnswer}
      >
        Answer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    paddingRight: 10,
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 20,
  },
  btnSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
});

export default headerRight;
