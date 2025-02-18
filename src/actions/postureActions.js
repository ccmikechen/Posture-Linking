import api from '../api/poselink';

export const UPDATE_SELECTED_RECORD_HEIGHT = 'UPDATE_SELECTED_RECORD_HEIGHT';
export const UPDATE_SELECTED_RECORD_WEIGHT = 'UPDATE_SELECTED_RECORD_WEIGHT';
export const UPDATE_SELECTED_RECORD_INSOLE_SIZE = 'UPDATE_SELECTED_RECORD_INSOLE_SIZE';
export const UPDATE_SELECTED_RECORD_POSTURE = 'UPDATE_SELECTED_RECORD_POSTURE';
export const UPDATE_RECORD_STARTED = 'UPDATE_RECORD_STARTED';
export const UPDATE_RECORD_STOPED = 'UPDATE_RECORD_STOPED';
export const UPDATE_POSTURE_TYPES = 'UPDATE_POSTURE_TYPES';
export const CLEAR_SELECTED_RECORD_FORM = 'CLEAR_SELECTED_RECORD_FORM';
export const UPDATE_CURRENT_POSTURE = 'UPDATE_CURRENT_POSTURE';
export const UPDATE_NEW_PART_RECORD_STARTED = 'UPDATE_NEW_PART_RECORD_STARTED';
export const UPDATE_NEW_PART_RECORD_STOPED = 'UPDATE_NEW_PART_RECORD_STOPED';

export const updateSelectedRecordHeight = (value) => (dispatch) => {
  dispatch({ type: UPDATE_SELECTED_RECORD_HEIGHT, value });
};

export const updateSelectedRecordWeight = (value) => (dispatch) => {
  dispatch({ type: UPDATE_SELECTED_RECORD_WEIGHT, value });
};

export const updateSelectedRecordInsoleSize = (value) => (dispatch) => {
  dispatch({ type: UPDATE_SELECTED_RECORD_INSOLE_SIZE, value });
};

export const updateSelectedRecordPosture = (value) => (dispatch) => {
  dispatch({ type: UPDATE_SELECTED_RECORD_POSTURE, value });
};

export const startRecording = () => (dispatch) => {
  dispatch({ type: UPDATE_RECORD_STARTED });
};

export const stopRecording = () => (dispatch) => {
  dispatch({ type: UPDATE_RECORD_STOPED });
};

export const loadPostureTypes = () => (dispatch) => {
  api.getPostures()
    .then(postures => {
      dispatch({ type: UPDATE_POSTURE_TYPES, postures });
    });
};

export const clearRecordForm = () => (dispatch) => {
  dispatch({ type: CLEAR_SELECTED_RECORD_FORM });
};

export const updateCurrentPosture = (id) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_POSTURE, id });
};

export const startRecordingNewPart = () => (dispatch) => {
  dispatch({ type: UPDATE_NEW_PART_RECORD_STARTED });
};

export const stopRecordingNewPart = () => (dispatch) => {
  dispatch({ type: UPDATE_NEW_PART_RECORD_STOPED });
};
