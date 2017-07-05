import { AsyncStorage, Platform } from 'react-native';

const API = "https://t21.bearlab.io/api";

const getToken = async () => {
  return await AsyncStorage.getItem('@session:token');
};

const getHeaders = async () => {
  const jsonToken = await getToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${jsonToken}`
  };
};

const handleError = (response) => {
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};

const parseResponse = (response) => {
  setTimeout(() => null, 0);
  return response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
};

const queryString = (params) => {
  const query = Object.keys(params)
                      .map(k =>
                         `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
};

export default {
  fetch: async (url, params = {}) => {
    const headers = await getHeaders();

    return await fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers
    })
    .then(parseResponse)
    .then(handleError);
  },

  post: async (url, data) => {
    const body = JSON.stringify(data);
    const headers = await getHeaders();

    return await fetch(`${API}${url}`, {
      method: 'POST',
      headers,
      body
    })
    .then(parseResponse);
  },

  patch: async (url, data) => {
    const body = JSON.stringify(data);
    const headers = await getHeaders();

    return await fetch(`${API}${url}`, {
      method: 'PATCH',
      headers,
      body
    })
    .then(parseResponse);
  },

  delete: async (url) => {
    const headers = await getHeaders();

    return await fetch(`${API}${url}`, {
      method: 'DELETE',
      headers
    })
    .then(parseResponse);
  }
};
