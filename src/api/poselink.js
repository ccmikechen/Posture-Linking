import server from './server';
import { AsyncStorage } from 'react-native';

const parseCombination = (combination) => ({
  id: combination.id,
  description: combination.description,
  trigger: {
    serviceId: combination.trigger.service_id,
    config: combination.trigger.config,
    eventId: combination.trigger.event_id
  },
  action: {
    serviceId: combination.action.service_id,
    config: combination.action.config,
    eventId: combination.action.event_id
  },
  status: combination.status
});

const parseUserServiceConfig = (config) => ({
  status: config.status,
  serviceId: config.service_id,
  id: config.id,
  config: config.config
});

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
        data.map(parseCombination)
      ))
  ),
  createCombination: (data) => (
    server.post("/combinations", {
      ...data,
      trigger: {
        event_id: data.trigger.eventId,
        config: data.trigger.config
      },
      action: {
        event_id: data.action.eventId,
        config: data.action.config
      }
    })
      .then(response => response.data)
      .then(parseCombination)
  ),
  updateCombination: (id, data) => (
    server.patch(`/combinations/${id}`, {
      ...data,
      trigger: {
        event_id: data.trigger.eventId,
        config: data.trigger.config
      },
      action: {
        event_id: data.action.eventId,
        config: data.action.config
      }
    })
  ),
  updateCombinationStatus: (id, status) => (
    server.patch(`/combination/status`, {
      id,
      status
    })
  ),
  removeCombination: (id) => (
    server.delete(`/combinations/${id}`)
  ),
  getUserServiceConfig: (serviceId) => (
    server.fetch('/user_service_configs', {
      service_id: serviceId
    })
      .then(response => response.data)
      .then(data => parseUserServiceConfig)
  ),
  getUserServiceConfigs: () => (
    server.fetch('/user_service_configs')
      .then(response => response.data)
      .then(data => data.map(parseUserServiceConfig))
  ),
  createUserServiceConfig: (serviceId, config, status) => (
    server.post('/user_service_configs', {
      service_id: serviceId,
      config,
      status
    })
  ),
  updateUserServiceConfig: (serviceId, config) => (
    server.patch('/user_service_configs', {
      service_id: serviceId,
      config
    })
  ),
  trigger: (eventId, payload) => (
    server.post('/trigger/trigger', {
      event_id: eventId,
      payload: {
        combination_id: payload.combinationId
      }
    })
  ),
  getPostures: () => (
    server.fetch('/posture/postures')
      .then(response => response.data)
  ),
  getLatestModel: (toFile) => (
    server.downloadFile('/posture/model', toFile)
  )
};
