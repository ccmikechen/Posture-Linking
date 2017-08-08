import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  records: [],
  recordDataList: []
});

const postureRecord = handleActions({
  UPDATE_POSTURE_RECORDS: (state, { records }) => (
    state.set('records', Immutable.fromJS(records))
  ),
  UPDATE_POSTURE_RECORD_DATA: (state, { data }) => (
    state.set('recordDataList', Immutable.fromJS(data))
  )
}, InitialState);

export default postureRecord;
