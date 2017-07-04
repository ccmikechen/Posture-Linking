import poselink from '../api/poselink';
import { getTriggerService, getActionService } from '../../lib/helper';

export const UPDATE_COMBINATION_LIST = 'UPDATE_COMBINATION_LIST';
export const IS_GET_COMBINATION_LIST = 'IS_GET_COMBINATION_LIST';
export const UPDATE_ACTION_LIST = 'UPDATE_ACTION_LIST';
export const IS_GET_ACTION_LIST = 'IS_GET_ACTION_LIST';
export const UPDATE_TRIGGER_LIST ='UPDATE_TRIGGER_LIST';
export const IS_GET_TRIGGER_LIST = 'IS_GET_TRIGGER_LIST';

export const updateCombinationList = () => (dispatch) => {
  poselink.getCombinations()
  .then(data => {
    dispatch({ type: UPDATE_COMBINATION_LIST , data });
    dispatch({ type: IS_GET_COMBINATION_LIST });
  })
}

export const getActionList = () => (dispatch) => {
  let actions = getActionService();
  dispatch({ type: UPDATE_ACTION_LIST, actions });
  dispatch({ type: IS_GET_ACTION_LIST });
}

export const getTriggerList = () => (dispatch) => {
  let triggers = getTriggerService();
  dispatch({ type: UPDATE_TRIGGER_LIST, triggers });
  dispatch({ type: IS_GET_TRIGGER_LIST });
}
