import { AsyncStorage } from 'react-native';
import server from '../api/server';
import startApp from '../index';
import api from '../api/poselink';
import {
  startLoginApp
} from '../apps';
import ServiceManager from '../../lib/ServiceManager';
import CombinationManager from '../../lib/CombinationManager';

export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_AUTHENTICATED = 'UPDATE_AUTHENTICATED';
export const UPDATE_IS_LOGGING_IN = 'UPDATE_IS_LOGGING_IN';
export const UPDATE_IS_NOT_LOGGING_IN = 'UPDATE_IS_NOT_LOGGING_IN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const UPDATE_IS_SIGNING_UP = 'UPDATE_IS_SIGNING_UP';
export const UPDATE_IS_NOT_SIGNING_UP = 'UPDATE_IS_NOT_SIGNING_UP';
export const UPDATE_UNAUTHENTICATED = 'UPDATE_UNAUTHENTICATED';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const IS_SIGN_UP_FAILD = 'IS_SIGN_UP_FAILD';

export const createAccount = (data) => (dispatch) => {
  dispatch({ type: UPDATE_IS_SIGNING_UP });

  api.createUser(data)
  .then(() => {
    startApp().then(()=>{
      dispatch({ type: UPDATE_AUTHENTICATED });
      dispatch({ type: UPDATE_IS_NOT_SIGNING_UP });
    })
  })
  .catch(error => {
    dispatch({ type: SIGN_UP_ERROR, error})
    dispatch({ type: UPDATE_IS_NOT_SIGNING_UP });
    dispatch({ type: IS_SIGN_UP_FAILD });
  });
};

export const login = (data) => (dispatch) => {
  dispatch({ type: UPDATE_IS_LOGGING_IN });

  api.createSession({
    ...data
  })
  .then(()=> {
    startApp().then(() => {
      dispatch({ type: UPDATE_AUTHENTICATED });
      dispatch({ type: UPDATE_IS_NOT_LOGGING_IN });
    })
  })
  .catch(error => {
    dispatch({ type: LOGIN_FAILED, error });
    dispatch({ type: UPDATE_IS_NOT_LOGGING_IN });
  });
};

export const logout = () => async (dispatch) => {
  await CombinationManager.unloadAllCombinations();
  await ServiceManager.clearAllService();
  await api.destroySession()
  .then(response => {
    dispatch({ type: UPDATE_UNAUTHENTICATED });
    startLoginApp();
  });
};

export const updateUsername = (username) => (dispatch) => {
  return dispatch({
    type: UPDATE_USERNAME,
    username
  });
};

export const updatePassword = (password) => (dispatch) => {
  return dispatch({
    type: UPDATE_PASSWORD,
    password
  });
};
