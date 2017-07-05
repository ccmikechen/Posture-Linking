import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  DataSource: {},
  actions: {},
  triggers: {},
  isGetActions: false,
  isGetTriggers: false,
  isGetCombinations: false,
  triggerId: '',
  actionId: '',
  notificationConfig: {
    notifyText: ''
  },
  description: ''
});

const combination = handleActions({
  UPDATE_COMBINATION_LIST: (state, { data }) => {
    return state.set('DataSource', data)
  },
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
  ),
  IS_GET_COMBINATION_LIST: (state, { select }) => (
    state.set('isGetCombinations', select)
  ),
  GET_TRIGGER_ID: (state, { id }) => (
    state.set('triggerId', id)
  ),
  GET_ACTION_ID: (state, { id }) => (
    state.set('actionId', id)
  ),
  SET_NOTIFY_TEXT: (state, { text }) => (
    state.setIn(['notificationConfig', 'notifyText'], text)
  ),
  SET_COMBINATION_DESCRIPTION:(state, { text }) => (
    state.set('description', text)
  ),

}, InitialState);

export default combination;
