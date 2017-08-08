import api from '../api/poselink';

export const UPDATE_POSTURE_RECORDS = 'UPDATE_POSTURE_RECORDS';
export const UPDATE_POSTURE_RECORD_DATA = 'UPDATE_POSTURE_RECORD_DATA';

export const updatePostureRecords = () => (dispatch) => {
  api.getPostureRecords()
    .then(records => {
      dispatch({ type: UPDATE_POSTURE_RECORDS, records });
    });
};

export const updatePostureRecordData = (id) => (dispatch) => {
  api.getPostureRecordData(id)
    .then(data => {
      dispatch({ type: UPDATE_POSTURE_RECORD_DATA, data });
    });
};
