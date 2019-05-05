import AsyncStorage from '@react-native-community/async-storage';

export const setItem = (key, item) => {
  if (typeof item === 'object') {
    return AsyncStorage.setItem(key, JSON.stringify(item));
  }
  return AsyncStorage.setItem(key, item);
};

export const getItem = key =>
  AsyncStorage.getItem(key).then(item => {
    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  });
