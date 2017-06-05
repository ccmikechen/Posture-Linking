import { combineReducers } from 'redux-immutable';
import session from './session';
import ble from './ble';

const appReducer = combineReducers({
    session,
    ble
});

export default function(state, action) {
  return appReducer(state, action);
}
