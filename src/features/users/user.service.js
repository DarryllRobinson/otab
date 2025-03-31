import { BehaviorSubject } from "rxjs";

import config from "../../_config/config";
import { fetchWrapper } from "../../_helpers";

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/users`;

export const userService = {
  login, // Authenticate the user and start a refresh token timer
  logout, // Log out the user and clear session data
  refreshToken, // Refresh the user's JWT token
  register, // Register a new user
  verifyEmail, // Verify the user's email address
  forgotPassword, // Send a password reset email
  validateResetToken, // Validate the password reset token
  resetPassword, // Reset the user's password
  getAll, // Fetch all users
  getById, // Fetch a user by ID
  create, // Create a new user
  update, // Update an existing user
  delete: _delete, // Delete a user
  user: userSubject.asObservable(), // Observable for the current user
  get userValue() {
    return userSubject.value; // Get the current user value
  },
  _userSubject: userSubject, // Expose userSubject for testing
};

// Authenticate the user and start a refresh token timer
function login(params) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, params).then((user) => {
    if (!user || typeof user !== "object") {
      throw new Error("Email or password is incorrect");
    }
    userSubject.next(user);
    startRefreshTokenTimer();
    return user;
  });
}

// Log out the user and clear session data
function logout() {
  // Revoke token only if userSubject.value is not null
  if (userSubject.value) {
    fetchWrapper
      .post(`${baseUrl}/revoke-token`, userSubject.value)
      .catch(() => {
        console.error("Failed to revoke token during logout.");
      });
  }
  stopRefreshTokenTimer();
  userSubject.next(null);
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
}

// Refresh the user's JWT token
function refreshToken() {
  return fetchWrapper.post(`${baseUrl}/refresh-token`, {}).then((user) => {
    if (user?.email) {
      userSubject.next(user);
      startRefreshTokenTimer();
      return user;
    }
  });
}

// Register a new user
function register(params) {
  return fetchWrapper.post(`${baseUrl}/register`, params);
}

// Verify the user's email address
function verifyEmail(token) {
  return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

// Send a password reset email
function forgotPassword(email) {
  return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

// Validate the password reset token
function validateResetToken(token) {
  return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

// Reset the user's password
function resetPassword({ token, password, confirmPassword }) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  return fetchWrapper.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

// Fetch all users
function getAll() {
  return fetchWrapper.get(baseUrl);
}

// Fetch a user by ID
function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

// Create a new user
function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

// Update an existing user
function update(id, params) {
  return fetchWrapper
    .put(`${baseUrl}/${id}`, params)
    .then((user) => {
      if (user.id === userSubject.value.id) {
        user = { ...userSubject.value, ...user };
        userSubject.next(user);
      }
      return user;
    })
    .catch((error) => {
      console.error(`Failed to update user with ID ${id}:`, error.message);
      throw error;
    });
}

// Delete a user
function _delete(id) {
  return fetchWrapper
    .delete(`${baseUrl}/${id}`)
    .then((x) => {
      if (id === userSubject.value.id) {
        logout();
      }
      return x;
    })
    .catch((error) => {
      console.error(`Failed to delete user with ID ${id}:`, error.message);
      throw error;
    });
}

// Helper functions
let refreshTokenTimeout;

// Start the refresh token timer
function startRefreshTokenTimer() {
  const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split(".")[1]));
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

// Stop the refresh token timer
function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
