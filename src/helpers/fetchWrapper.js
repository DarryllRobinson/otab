import AppSettings from './appSettings';

export const fetchWrapper = {
  post,
};

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
