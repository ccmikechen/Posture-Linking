import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  isGetServices : false,
  services:[]
});

const service = handleActions({
  IS_GETTING_SERVIECS: (state) => (
    state.set('isGetServices', true)
  ),
  IS_NOT_GETTING_SERVICES: (state) => (
    state.set('isGetServices', true)
  ),
  GET_SERVICES: (state, { services }) => (
    state.set('services', services)
  )
}, InitialState);

export default service;
