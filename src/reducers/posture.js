import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const initialRecordForm = Immutable.fromJS({
  height: null,
  weight: null,
  insoleSize: '7',
  posture: 1,
  currentPosture: 1
});

const InitialState = Immutable.fromJS({
  recordForm: initialRecordForm.toJS(),
  isRecording: false,
  postureTypes: [],
  isRecordingNewPart: false
});

const posture = handleActions({
  UPDATE_SELECTED_RECORD_HEIGHT: (state, { value }) => (
    state.setIn(['recordForm', 'height'], value)
  ),
  UPDATE_SELECTED_RECORD_WEIGHT: (state, { value }) => (
    state.setIn(['recordForm', 'weight'], value)
  ),
  UPDATE_SELECTED_RECORD_INSOLE_SIZE: (state, { value }) => (
    state.setIn(['recordForm', 'insoleSize'], value)
  ),
  UPDATE_SELECTED_RECORD_POSTURE: (state, { value }) => (
    state.setIn(['recordForm', 'posture'], value)
  ),
  UPDATE_RECORD_STARTED: (state) => (
    state.set('isRecording', true)
  ),
  UPDATE_RECORD_STOPED: (state) => (
    state.set('isRecording', false)
  ),
  UPDATE_POSTURE_TYPES: (state, { postures }) => (
    state.set('postureTypes', postures)
  ),
  CLEAR_SELECTED_RECORD_FORM: (state) => (
    state.set('recordForm', initialRecordForm)
  ),
  UPDATE_CURRENT_POSTURE: (state, { id }) => (
    state.set('currentPosture', id)
  ),
  UPDATE_NEW_PART_RECORD_STARTED: (state) => (
    state.set('isRecordingNewPart', true)
  ),
  UPDATE_NEW_PART_RECORD_STOPED: (state) => (
    state.set('isRecordingNewPart', false)
  )
}, InitialState);

export default posture;
