import { combineReducers } from 'redux-immutable';
import session from './session';
import ble from './ble';
import combination from './combination';

const appReducer = combineReducers({
    session,
    ble,
    combination
});

export default function(state, action) {
  return appReducer(state, action);
}
