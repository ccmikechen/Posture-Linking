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
  createCombination: (data) => (
    server.post("/combinations", {
      ...data,
      trigger: {
        service_id: data.trigger.serviceId,
        config: data.trigger.config
      },
      action: {
        service_id: data.action.serviceId,
        config: data.action.config
      }
    })
  ),
  updateCombination: (id, data) => (
    server.patch(`/combinations/${id}`, {
      ...data,
      trigger: {
        service_id: data.trigger.serviceId,
        config: data.trigger.config
      },
      action: {
        service_id: data.action.serviceId,
        config: data.action.config
      }
    })
  ),
  removeCombination: (id) => (
    server.delete(`/combinations/${id}`)
  ),
  getUserServiceConfig: (serviceId) => (
    server.get('/user_service_configs', {
      service_id: serviceId
    })
    .then(response => response.data)
  ),
  getUserServiceConfigs: () => (
    server.get('/user_service_configs')
    .then(response => response.data)
  ),
  createUserServiceConfig: (serviceId, config) => (
    server.post('/user_service_configs', {
      service_id: serviceId,
      config
    })
  ),
  updateUserServiceConfig: (serviceId, config) => (
    server.patch('/user_service_configs', {
      service_id: serviceId,
      config
    })
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
