import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  isGettingServices : false,
  services: [],
  selectedService: 0,
  isAuthorizing: false
});

const service = handleActions({
  IS_GETTING_SERVICES: (state) => (
    state.set('isGettingServices', true)
  ),
  IS_NOT_GETTING_SERVICES: (state) => (
    state.set('isGettingServices', false)
  ),
  GET_SERVICES: (state, { services }) => (
    state.set('services', Immutable.fromJS(services))
  ),
  SELECT_SERVICE: (state, { id }) => (
    state.set('selectedService', id)
  ),
  IS_AUTHORIZING: (state) => (
    state.set('isAuthorizing', true)
  ),
  IS_NOT_AUTHORIZING: (state) => (
    state.set('isAuthorizing', false)
  ),
  CONNECT_SERVICE: (state, { id }) => {
    let newServices = state.get('services').map(service => {
      if(service.get('id') == id) {
        return service.set('isConnected', true);
      }
      return service;
    });

    return state.set('services', newServices);
  },
  DISCONNECT_SERVICE: (state, { id }) => {
    let newServices = state.get('services').map(service => {
      if(service.get('id') == id) {
        return service.set('isConnected', false);
      }
      return service;
    });

    return state.set('services', newServices);
  }
}, InitialState);

export default service;
