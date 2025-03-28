import AppSettings from './appSettings';
import { userService } from '../features/Users';

export const fetchWrapper = {
  get,
  getDocument,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url),
  };
  return fetch(`${AppSettings.serverEndpoint}${url}`, requestOptions).then(
    handleResponse
  );
}

function getDocument(url, location) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json, application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
      ...authHeader(url),
    },
    credentials: 'include',
    body: JSON.stringify(location),
  };

  return fetch(`${AppSettings.serverEndpoint}${url}`, requestOptions).then(
    handleResponseForDocuments
  );
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${AppSettings.serverEndpoint}${url}`, requestOptions).then(
    handleResponse
  );
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(`${AppSettings.serverEndpoint}${url}`, requestOptions).then(
    handleResponse
  );
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(url),
  };
  return fetch(`${AppSettings.serverEndpoint}${url}`, requestOptions).then(
    handleResponse
  );
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.jwtToken;
  if (isLoggedIn) {
    //console.log('jwtToken: ', user.jwtToken);
    return { Authorization: `Bearer ${user.jwtToken}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  //console.log('response: ', response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        userService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function handleResponseForDocuments(response) {
  console.log('handleResponseForDocuments response: ', response);
  //return response;
  return response.text().then((text) => {
    const data = text; // && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        userService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    console.log('data: ', data);
    return data;
  });
}
