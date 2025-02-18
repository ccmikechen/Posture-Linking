import { combineReducers } from 'redux-immutable';
import session from './session';
import ble from './ble';
import combination from './combination';
import posture from './posture';
import postureRecord from './postureRecord';
import service from './service';
import { reducer as form } from 'redux-form/immutable'

const appReducer = combineReducers({
    session,
    ble,
    combination,
    posture,
    postureRecord,
    service,
    form
});

export default function(state, action) {
  return appReducer(state, action);
}
