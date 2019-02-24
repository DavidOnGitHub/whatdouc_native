import _ from 'lodash';
import initialState from './initialState';
import { types } from '../actions/types';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case types.SET_AUTH:
      return _.assign({}, state, action.auth);
    case types.SET_USER:
      return _.merge({}, state, action.user);
    default:
      return state;
  }
};
