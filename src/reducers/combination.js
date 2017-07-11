import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  combinations: [],
  actions: [],
  triggers: [],
  isGetActions: false,
  isGetTriggers: false,
  isGetCombinations: false,
  triggerId: '',
  actionId: '',
  description: '',
  triggerConfig: {},
  actionConfig: {},
  selectedTriggerConfig: '',
  selectedActionConfig: ''
});

const combination = handleActions({
  UPDATE_COMBINATION_LIST: (state, { data }) => {
    let combinations = Immutable.fromJS(data.map(combination => ({
      id: combination.id,
      status: combination.status,
      description: combination.description,
      trigger: combination.trigger,
      action: combination.action
    })));

    return state.set('combinations', combinations);
  },
  UPDATE_ACTION_LIST: (state, { actions }) => (
    state.set('actions', actions)
  ),
  IS_GETTING_ACTION_LIST: (state) => (
    state.set('isGetActions', true)
  ),
  IS_NOT_GETTING_ACTION_LIST: (state) => (
    state.set('isGetActions', false)
  ),
  UPDATE_TRIGGER_LIST: (state, { triggers }) => (
    state.set('triggers', triggers)
  ),
  IS_GETTING_TRIGGER_LIST: (state) => (
    state.set('isGetTriggers', true)
  ),
  IS_NOT_GETTING_TRIGGER_LIST: (state) => (
    state.set('isGetTriggers', false)
  ),
  IS_GETTING_COMBINATION_LIST: (state) => (
    state.set('isGetCombinations', true)
  ),
  IS_NOT_GETTING_COMBINATION_LIST: (state) => (
    state.set('isGetCombinations', false)
  ),
  GET_TRIGGER_ID: (state, { id }) => (
    state.set('triggerId', id)
  ),
  GET_ACTION_ID: (state, { id }) => (
    state.set('actionId', id)
  ),
  SET_COMBINATION_DESCRIPTION: (state, { text }) => (
    state.set('description', text)
  ),
  SET_TRIGGER_CONFIG: (state, { config }) => (
    state.set('triggerConfig', config)
  ),
  SET_ACTION_CONFIG: (state, { config }) => (
    state.set('actionConfig', config)
  ),
  SET_SELECTED_TRIGGER_CONFIG: (state, { id }) => (
    state.set('selectedTriggerConfig', id)
  ),
  SET_SELECTED_ACTION_CONFIG: (state, { id }) => (
    state.set('selectedActionConfig', id)
  ),
  SET_COMBINATION_STATUS: (state, { id, status }) => {
    let newCombinations = state.get('combinations').map(combination => {
      if (combination.get('id') == id) {
        return combination.set('status', status);
      }
      return combination;
    });

    return state.set('combinations', newCombinations);
  },
  CREATE_COMBINATION: (state, { combination }) => {
    let newCombinations = state.get('combinations').push(combination);

    return state.set('combinations', newCombinations);
  },
  REMOVE_COMBINATION: (state, { id }) => {
    let newCombinations = state.get('combinations').filter(combination => {
      return combination.toJS().id != id;
    });
    
    return state.set('combinations', newCombinations);
  }
}, InitialState);

export default combination;
