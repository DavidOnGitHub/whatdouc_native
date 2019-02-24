import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import question from './question';
import ui from './ui';

export default combineReducers({
  auth,
  question,
  ui,
  form
});
