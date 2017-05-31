import { AsyncStorage } from 'react-native';
import server from '../api/server';
import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_AUTHENTICATED
} from '../constants/actionTypes';
import { startMainApp } from '../apps';

export const createAccount = (dispatch) => {
  let data = 'testdata';
  return (dispatch) => server.post('/users', {
    username: data,
    email: data,
    password: data,
    first_name: data,
    last_name: data,
    sex: data
  })
  .then(response => {
    console.log(response);
    return response;
  })
  .catch(error => {
    console.log(error);
  });
};

export const login = (data) => (dispatch) => () => {
  console.log(data);
  server.post('/sessions', {
    ...data
  })
  .then(response => {
    let { token } = response.meta;
    AsyncStorage.setItem('@session:token', token);
    startMainApp();

    return dispatch({
      type: UPDATE_AUTHENTICATED
    });
  })
  .catch(error => {
    console.log(error);
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
