function parseResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
                      .map(k =>
                         `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    console.log(`${url}${queryString(params)}`);
    return fetch(`${url}${queryString(params)}`, {
      method: 'GET'
    })
    .then(parseResponse);
  },
};
