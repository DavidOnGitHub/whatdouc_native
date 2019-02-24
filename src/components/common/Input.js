import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles';

const Input = ({
  input,
  label,
  containerStyle,
  secureTextEntry,
  meta: { touched, error },
  setRef,
  ...otherProps
}) => {
  const inputProps = { ...input };
  inputProps.onChangeText = input.onChange;
  delete inputProps.onChange;

  const isError = touched && error;

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, isError && styles.errorContainer]}>
        <TextInput
          style={[styles.input, isError && styles.errorText]}
          {...otherProps}
          placeholderTextColor={colors.lightGrey}
          secureTextEntry={secureTextEntry}
          {...inputProps}
          underlineColorAndroid={'transparent'}
          ref={setRef}
        />
        {input.value.length > 0 && (
          <TouchableWithoutFeedback onPress={() => input.onChange('')}>
            <Icon
              name="x"
              color={colors.borderGrey}
              size={20}
              style={styles.xBtn}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      {isError && (
        <View>
          <Text style={styles.errorTxt}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  errorTxt: {
    position: 'absolute',
    right: 0,
    top: 4,
    fontSize: 16,
    color: colors.danger
  },
  label: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 0
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: colors.primary
  },
  input: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    color: colors.black
  },
  errorText: {
    color: colors.danger
  },
  errorContainer: {
    borderBottomWidth: 2,
    borderColor: colors.danger
  },
  xBtn: {
    position: 'absolute',
    right: 0,
    top: 10
  }
});

export default Input;
