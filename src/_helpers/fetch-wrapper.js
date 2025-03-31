import config from "../_config/config";
import { userService } from "../features/Users/user.service";

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function request(url, method, body = null) {
  const headers = { "Content-Type": "application/json", ...authHeader(url) };
  const requestOptions = {
    method,
    headers,
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function get(url) {
  return request(url, "GET");
}

async function post(url, body) {
  return request(url, "POST", body);
}

async function put(url, body) {
  return request(url, "PUT", body);
}

async function _delete(url) {
  return request(url, "DELETE");
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
  return response
    .text()
    .then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && userService.userValue) {
          userService.logout();
        }

        const error = (data && data.message) || response.statusText;
        console.error(`API Error: ${response.status}`);
        return Promise.reject(new Error(error));
      }

      return data;
    })
    .catch((error) => {
      console.error("An error occurred while processing the API response.");
      throw error;
    });
}
