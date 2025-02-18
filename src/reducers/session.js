import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  username: "",
  password: "",
  isAuthenticated: false,
  isLoggingIn: false,
  failed: false,
  error: '',
  user: {
    username: '',
    sex: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    nickName: '',
    image: '',
    id: null,
    email: '',
    birthday: null
  },
  isSigningUp: false,
  signUpError: {},
  isSignUpFaild: false,
  isLoggingOut: false,
});

const session = handleActions({
  UPDATE_USERNAME: (state, { username }) => (
    state.set('username', username)
  ),
  UPDATE_PASSWORD: (state, { password }) => (
    state.set('password', password)
  ),
  UPDATE_AUTHENTICATED: (state) => (
    state.set('isAuthenticated', true)
  ),
  UPDATE_IS_LOGGING_IN: (state) => (
    state.set('isLoggingIn', true)
    .set('failed', false)
    .set('error', null)
  ),
  UPDATE_IS_NOT_LOGGING_IN: (state) => (
    state.set('isLoggingIn', false)
  ),
  LOGIN_FAILED: (state , { error }) => (
    state.set('failed', true)
    .set('error', error)
  ),
  UPDATE_UNAUTHENTICATED: (state) => (
    state.set('isAuthenticated', false)
      .setIn(['user', 'username'], '')
      .setIn(['user', 'sex'], '')
      .setIn(['user', 'phoneNumber'], '')
      .setIn(['user', 'nickName'], '')
      .setIn(['user', 'firstName'], '')
      .setIn(['user', 'lastName'], '')
      .setIn(['user', 'image'], '')
      .setIn(['user', 'id'], null)
      .setIn(['user', 'email'], '')
      .setIn(['user', 'birthday'], null)
  ),
   UPDATE_IS_SIGNING_UP: (state) => (
    state.set('isSigningUp', true)
  ),
  UPDATE_IS_NOT_SIGNING_UP: (state) => (
    state.set('isSigningUp', false)
  ),
  SIGN_UP_ERROR: (state, { error }) => (
    state.set('signUpError', error)
  ),
  IS_SIGN_UP_FAILD: (state) => (
    state.set('isSignUpFaild', true)
  ),
  IS_LOGGING_OUT: (state) => (
    state.set('isLoggingOut', true)
  ),
  IS_NOT_LOGGING_OUT: (state) => (
    state.set('isLoggingOut', false)
  ),
  GET_USER_INFO : (state, { data }) => (
    state.setIn(['user', 'username'], data.username)
      .setIn(['user', 'sex'], data.sex)
      .setIn(['user', 'phoneNumber'], data.phonenumber)
      .setIn(['user', 'nickName'], data.nickname)
      .setIn(['user', 'firstName'], data.firstname)
      .setIn(['user', 'lastName'], data.lastname)
      .setIn(['user', 'image'], data.image)
      .setIn(['user', 'id'], data.id)
      .setIn(['user', 'email'], data.email)
      .setIn(['user', 'birthday'], data.birthday)
  )
}, InitialState);

export default session;
