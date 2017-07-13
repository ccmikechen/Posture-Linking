import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  isGetServices : false,
  services:[],
  service:[],
  selectedService: '',
  isAuthorizing: false
});

const service = handleActions({
  IS_GETTING_SERVICES: (state) => (
    state.set('isGetServices', true)
  ),
  IS_NOT_GETTING_SERVICES: (state) => (
    state.set('isGetServices', false)
  ),
  GET_SERVICES: (state, { services }) => (
    state.set('services', services)
  ),
  SELECT_SERVICE: (state, { id }) => (
    state.set('selectedService', id)
  ),
  GET_SERVICE: (state, { service }) => (
    state.set('service', service)
  ),
  DISCONNECT_SERVICE: (state, { id }) => {
    let newServices = state.get('services').map(service => {
      if(service.id == id) {
        service.isConnected = false
      }
      return service;
    });

    return state.set('services', newServices)
  },
  IS_AUTHORIZING: (state) => (
    state.set('isAuthorizing', true)
  ),
  IS_NOT_AUTHORIZING: (state) => (
    state.set('isAuthorizing', false)
  ),
  SUCCESS_AUTHORIZE: (state, { service }) => (
    state.set('service', service)
  ),
  CONNECT_SERVICE: (state, { id }) => {
    let newServices = state.get('services').map(service => {
      if(service.id == id) {
        service.isConnected = true
      }
      return service;
    });

    return state.set('services', newServices)
  }
}, InitialState);

export default service;
