import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  DataSource: []
});

const combination = handleActions({
  UPDATE_COMBINATION_LIST: (state, { data }) => (
    state.set('DataSource', data)
  )
}, InitialState);

export default combination;
