import Toast from 'react-native-root-toast';

const defaultOptions = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.CENTER,
  shadow: true,
  delay: 0,
  hideOnPress: true,
};
const showToast = (message, options) => Toast.show(message, Object.assign(defaultOptions, options));

export { showToast };
