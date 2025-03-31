import config from "../_config/config";
import { userService } from "../features/Users/user.service";

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// Helper functions
function authHeader(url) {
  const user = userService.userValue;
  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith(config.apiUrl);
  return isLoggedIn && isApiUrl
    ? { Authorization: `Bearer ${user.jwtToken}` }
    : {};
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && userService.userValue) {
        userService.logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
