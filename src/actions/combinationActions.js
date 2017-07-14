import api from '../api/poselink';
import ServiceManager from '../../lib/ServiceManager';
import CombinationManager from '../../lib/CombinationManager';

export const UPDATE_COMBINATION_LIST = 'UPDATE_COMBINATION_LIST';
export const IS_GETTING_COMBINATION_LIST = 'IS_GETTING_COMBINATION_LIST';
export const IS_NOT_GETTING_COMBINATION_LIST = 'IS_NOT_GETTING_COMBINATION_LIST';
export const UPDATE_ACTION_LIST = 'UPDATE_ACTION_LIST';
export const IS_GETTING_ACTION_LIST = 'IS_GETTING_ACTION_LIST';
export const IS_NOT_GETTING_ACTION_LIST = 'IS_NOT_GETTING_ACTION_LIST';
export const UPDATE_TRIGGER_LIST ='UPDATE_TRIGGER_LIST';
export const IS_GETTING_TRIGGER_LIST = 'IS_GETTING_TRIGGER_LIST';
export const IS_NOT_GETTING_TRIGGER_LIST = 'IS_NOT_GETTING_TRIGGER_LIST';
export const CREATE_COMBINATION = 'CREATE_COMBINATION';
export const REMOVE_COMBINATION = 'REMOVE_COMBINATION';
export const GET_TRIGGER_ID = 'GET_TRIGGER_ID';
export const GET_ACTION_ID = 'GET_ACTION_ID';
export const SET_COMBINATION_DESCRIPTION = 'SET_COMBINATION_DESCRIPTION';
export const SET_TRIGGER_CONFIG = 'SET_TRIGGER_CONFIG';
export const SET_ACTION_CONFIG = 'SET_ACTION_CONFIG';
export const SET_SELECTED_TRIGGER_CONFIG = 'SET_SELECTED_TRIGGER_CONFIG';
export const SET_SELECTED_ACTION_CONFIG = 'SET_SELECTED_ACTION_CONFIG';
export const ADD_COMBINATION = 'ADD_COMBINATION';
export const SET_COMBINATION_STATUS = 'SET_COMBINATION_STATUS';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const IS_GETTING_EVENTS = 'IS_GETTING_EVENTS';
export const IS_NOT_GETTING_EVENTS= 'IS_NOT_GETTING_EVENTS';
export const IS_GETTING_EVENT = 'IS_GETTING_EVENT';
export const IS_NOT_GETTING_EVENT = 'IS_NOT_GETTING_EVENT';
export const SELECT_OPTION = 'SELECT_OPTION';
export const IS_GETTING_TRIGGER_CONFIG = 'IS_GETTING_TRIGGER_CONFIG';
export const IS_GETTING_ACTION_CONFIG = 'IS_GETTING_ACTION_CONFIG';
export const IS_NOT_GETTING_TRIGGER_CONFIG = 'IS_NOT_GETTING_TRIGGER_CONFIG';
export const IS_NOT_GETTING_ACTION_CONFIG = 'IS_NOT_GETTING_ACTION_CONFIG';

export const updateCombinationList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_COMBINATION_LIST});
  let data = CombinationManager.getCombinations();
  dispatch({ type: UPDATE_COMBINATION_LIST, data });
  dispatch({ type: IS_GETTING_COMBINATION_LIST});
};

export const notUpdateCombinationList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_COMBINATION_LIST});
};

export const isUpdateCombinationList = () => (dispatch) => {
  dispatch({ type: IS_GETTING_COMBINATION_LIST});
};

export const getActionList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_ACTION_LIST });
  let actions = ServiceManager.getActionService();
  dispatch({ type: UPDATE_ACTION_LIST, actions });
  dispatch({ type: IS_GETTING_ACTION_LIST });
};

export const getTriggerList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_TRIGGER_LIST });
  let triggers = ServiceManager.getTriggerService();
  dispatch({ type: UPDATE_TRIGGER_LIST, triggers });
  dispatch({ type: IS_GETTING_TRIGGER_LIST });
};

export const setTriggerId = (id) => (dispatch) => {
  let config = {};
  dispatch({ type: IS_NOT_GETTING_TRIGGER_CONFIG });
  dispatch({ type: SET_TRIGGER_CONFIG, config});
  dispatch({ type: GET_TRIGGER_ID, id });
};

export const setActionId = (id) => (dispatch) => {
  let config = {};
  dispatch({ type: IS_NOT_GETTING_ACTION_CONFIG });
  dispatch({ type: SET_ACTION_CONFIG, config });
  dispatch({ type: GET_ACTION_ID, id });
};

export const setDescription = (text) => (dispatch) => {
  dispatch({ type: SET_COMBINATION_DESCRIPTION, text });
};

export const setTriggerConfig = (config) => (dispatch) => {
  dispatch({ type: SET_TRIGGER_CONFIG, config });
  dispatch({ type: IS_GETTING_TRIGGER_CONFIG });
};

export const setActionConfig = (config) => (dispatch) => {
  dispatch({ type: SET_ACTION_CONFIG, config });
  dispatch({ type: IS_GETTING_ACTION_CONFIG });
};

export const setSelectedTriggerConfig = (id) => (dispatch) => {
  dispatch({ type: SET_SELECTED_TRIGGER_CONFIG, id });
};

export const setSelectedActionConfig = (id) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ACTION_CONFIG, id });
};

export const getEventList = (id) => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_EVENTS });

  let events = ServiceManager.getEventsByServiceId(id);
  dispatch({ type: GET_EVENTS, events });
  dispatch({ type: IS_GETTING_EVENTS });
};

export const getEvent = (id) => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_EVENT });

  let event = ServiceManager.getEventById(id);
  dispatch({ type: GET_EVENT, event });
  dispatch({ type: IS_GETTING_EVENT });
};

export const setSelectedOption = (option) => (dispatch) => {
  dispatch({ type: SELECT_OPTION, option });
};

export const createCombination = (data) => (dispatch) => {
  return api.createCombination(data)
  .then((combination) => {
    CombinationManager.loadCombination(combination);
    return combination;
  }).then((combination) => {
    dispatch({ type:CREATE_COMBINATION, combination });
    return combination;
  });
};

export const removeCombination = (combination) => (dispatch) => {
  let id = combination.id;
  return api.removeCombination(combination.id)
    .then(() => {
      CombinationManager.removeCombination(combination);
    })
    .then(() => {
      dispatch({ type:REMOVE_COMBINATION, id });
    });
};

export const setCombinationStatus = (combination, status) => (dispatch) => {
  CombinationManager.getCombinationById(combination.id).setStatus(status);
  api.updateCombinationStatus(combination.id,  status);

  dispatch({
    type: SET_COMBINATION_STATUS,
    id: combination.id,
    status
  });
};
