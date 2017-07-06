import poselink from '../api/poselink';
import { getTriggerService, getActionService } from '../../lib/helper';
import { getCombinationManager } from '../../lib/CombinationManager';

export const UPDATE_COMBINATION_LIST = 'UPDATE_COMBINATION_LIST';
export const IS_GETTING_COMBINATION_LIST = 'IS_GETTING_COMBINATION_LIST';
export const IS_NOT_GETTING_COMBINATION_LIST = 'IS_NOT_GETTING_COMBINATION_LIST';
export const UPDATE_ACTION_LIST = 'UPDATE_ACTION_LIST';
export const IS_GETTING_ACTION_LIST = 'IS_GETTING_ACTION_LIST';
export const IS_NOT_GETTING_ACTION_LIST = 'IS_NOT_GETTING_ACTION_LIST';
export const UPDATE_TRIGGER_LIST ='UPDATE_TRIGGER_LIST';
export const IS_GETTING_TRIGGER_LIST = 'IS_GETTING_TRIGGER_LIST';
export const IS_NOT_GETTING_TRIGGER_LIST = 'IS_NOT_GETTING_TRIGGER_LIST';
export const GET_TRIGGER_ID = 'GET_TRIGGER_ID';
export const GET_ACTION_ID = 'GET_ACTION_ID';
export const SET_NOTIFY_TEXT = 'SET_NOTIFY_TEXT';
export const SET_COMBINATION_DESCRIPTION = 'SET_COMBINATION_DESCRIPTION';
export const ADD_COMBINATION = 'ADD_COMBINATION';

const combinationManager = getCombinationManager();
export const updateCombinationList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_COMBINATION_LIST});
  let data = combinationManager.getCombinations();
  dispatch({ type: UPDATE_COMBINATION_LIST, data });
  dispatch({ type: IS_GETTING_COMBINATION_LIST});
}

export const notUpdateCombinationList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_COMBINATION_LIST});
}

export const isUpdateCombinationList = () => (dispatch) => {
  dispatch({ type: IS_GETTING_COMBINATION_LIST});
}

export const getActionList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_ACTION_LIST });
  let actions = getActionService();
  dispatch({ type: UPDATE_ACTION_LIST, actions });
  dispatch({ type: IS_GETTING_ACTION_LIST });
}

export const getTriggerList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_TRIGGER_LIST });
  let triggers = getTriggerService();
  dispatch({ type: UPDATE_TRIGGER_LIST, triggers });
  dispatch({ type: IS_GETTING_TRIGGER_LIST });
}

export const setTriggerId = (id) => (dispatch) => {
  dispatch({ type: GET_TRIGGER_ID, id });
}

export const setActionId = (id) => (dispatch) => {
  dispatch({ type: GET_ACTION_ID, id });
}

export const setNotifyText = (text) => (dispatch) => {
  dispatch({ type: SET_NOTIFY_TEXT, text });
}

export const setDescription = (text) => (dispatch) => {
  dispatch({ type: SET_COMBINATION_DESCRIPTION, text });
}