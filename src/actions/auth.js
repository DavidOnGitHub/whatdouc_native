import { types } from './types';
import api from '../utils/api';
import { getItem, setItem } from '../utils/storage';

export const login = (username, password) => dispatch =>
  api.login({ username, password }).then(
    auth => {
      setItem('auth', auth);
      dispatch(setAuth(auth));
    },
    error => Promise.reject(console.log(error))
  );

export const facebookLogin = token => dispatch =>
  api.facebookLogin({ token }).then(
    auth => {
      setItem('auth', auth);
      dispatch(setAuth(auth));
    },
    error => Promise.reject(console.log(error))
  );

export const register = email => () =>
  api
    .register({ email })
    .then(response => response, error => Promise.reject(error.response.status));

export const setPassword = (password, activationCode) => () =>
  api
    .setPassword({ password, activationCode })
    .then(response => response, error => Promise.reject(error.response.status));

export const loadUser = () => dispatch => getItem('auth').then(auth => dispatch(setAuth(auth)));

export const updateUser = user => dispatch => {
  return api.updateUser(user).then(savedUser => {
    dispatch(updateUser(savedUser));
  });
};

export const logout = () => dispatch => {
  dispatch(setAuth({ token: null, user: null }));
  setItem('auth', '');
};

export const setAuth = auth => ({
  type: types.SET_AUTH,
  auth
});

export const setUser = user => ({
  type: types.SET_USER,
  user
});
