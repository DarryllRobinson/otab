import { BehaviorSubject } from "rxjs";

import config from "../../_config/config";
import { fetchWrapper } from "../../_helpers";

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/users`;

export const userService = {
  login,
  logout,
  refreshToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function login(params) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, params).then((user) => {
    if (typeof user !== "object" || user === null) {
      throw "Email or password is incorrect";
    }
    userSubject.next(user);
    startRefreshTokenTimer();
    return user;
  });
}

function logout() {
  fetchWrapper.post(`${baseUrl}/revoke-token`, userSubject.value);
  stopRefreshTokenTimer();
  userSubject.next(null);
}

function refreshToken() {
  return fetchWrapper.post(`${baseUrl}/refresh-token`, {}).then((user) => {
    if (user.email) {
      userSubject.next(user);
      startRefreshTokenTimer();
      return user;
    }
  });
}

function register(params) {
  return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
  return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email) {
  return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
  return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
  return fetchWrapper.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((user) => {
    if (user.id === userSubject.value.id) {
      user = { ...userSubject.value, ...user };
      userSubject.next(user);
    }
    return user;
  });
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    if (id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}

// Helper functions
let refreshTokenTimeout;

function startRefreshTokenTimer() {
  const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split(".")[1]));
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
