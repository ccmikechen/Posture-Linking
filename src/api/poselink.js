import server from './server';
import { AsyncStorage } from 'react-native';


export default {
  createSession: ({ username, password }) => (
    server.post('/sessions', {
      username,
      password
    })
    .then(response => {
      let token = response.meta.token;
      AsyncStorage.setItem('@session:token', token);
      return token;
    })
  ),
  destroySession: () => (
    server.delete('/sessions')
    .then(response => {
      if (response.ok) {
        AsyncStorage.setItem('@session:token', '');
      }
      return response;
    })
  ),
  refreshSession: () => {
    return server.post('/sessions/refresh')
    .then(response => {
      let token = response.meta.token;
      AsyncStorage.setItem('@session:token', token);
      return token;
    });
  },
  createUser: (data) => (
    server.post('/users', {
      ...data
    })
    .then(response => {
      let token = response.meta.token;
      AsyncStorage.setItem('@session:token', token);
      return token;
    })
  ),
  getCurrentUser: () => (
    server.fetch('/sessions/user')
    .then(response => response.data)
  ),
  getServices: () => (
    server.fetch('/services')
    .then(response => response.data)
  ),
  getCombinations: () => (
    server.fetch('/combinations')
    .then(response => response.data)
    .then(data => (
      data.map(combination => ({
        id: combination.id,
        description: combination.description,
        trigger: {
          serviceId: combination.trigger.service_id,
          config: combination.trigger.config
        },
        action: {
          serviceId: combination.action.service_id,
          config: combination.action.config
        },
        status: combination.status
      }))
    ))
  ),
  trigger: (serviceId, payload) => (
    server.post('/trigger/trigger', {
      service_id: serviceId,
      payload: {
        combination_id: payload.combinationId
      }
    })
  )
};
