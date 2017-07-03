import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  DataSource: [],
  actions: [],
  triggers: [],
  isGetActions: false,
  isGetTriggers: false,
});

const combination = handleActions({
  UPDATE_COMBINATION_LIST: (state, { data }) => (
    state.set('DataSource', data)
  ),
  UPDATE_ACTION_LIST: (state, { actions }) => (
    state.set('actions', actions)
  ),
  IS_GET_ACTION_LIST: (state) => (
    state.set('isGetActions', true)
  ),
  UPDATE_TRIGGER_LIST: (state, { triggers }) => (
    state.set('triggers', triggers)
  ),
  IS_GET_TRIGGER_LIST: (state) => (
    state.set('isGetTriggers', true)
  )

}, InitialState);

export default combination;
