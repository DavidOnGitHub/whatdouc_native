import initialState from './initialState';
import { types } from '../actions/types';

export default (state = initialState.ui, action) => {
  switch (action.type) {
    case types.LOADING:
      return Object.assign({}, state, { loading: action.loading });
    default:
      return state;
  }
};
