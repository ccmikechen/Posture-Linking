import { combineReducers } from 'redux-immutable';
import session from './session';
import ble from './ble';
import combination from './combination';
import posture from './posture';
import service from './service';

const appReducer = combineReducers({
    session,
    ble,
    combination,
    posture,
    service
});

export default function(state, action) {
  return appReducer(state, action);
}
