import initialState from './initialState';
import { types } from '../actions/types';

export default (state = initialState.question, action) => {
  switch(action.type) {
    case types.SET_QUESTIONS:
      return Object.assign({}, state, { questions: action.questions });
    default:
      return state;
  }
};
