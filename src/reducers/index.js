import { combineReducers } from 'redux-immutable';
import session from './session';
import ble from './ble';
import combination from './combination';
import posture from './posture';

const appReducer = combineReducers({
    session,
    ble,
    combination,
    posture
});

export default function(state, action) {
  return appReducer(state, action);
}
