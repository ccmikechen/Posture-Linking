import { combineReducers } from 'redux-immutable';
import session from './session';

const appReducer = combineReducers({
    session
});

export default function(state, action) {
  return appReducer(state, action);
}
