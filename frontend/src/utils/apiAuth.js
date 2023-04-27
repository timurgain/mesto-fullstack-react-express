import { backend } from '../config.js';

/**
 * info: backend puts jwt in httpOnly cookies
 */

// register - create user
function register(email, password) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  return fetch(`${backend.baseUrl}/signup`, options).then(responseToJson);
}

// login - get token
function login(email, password) {
  const options = {
    method: 'POST',
    credentials: 'include', // send cookie including httpOnly cookies with jwt
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  return fetch(`${backend.baseUrl}/signin`, options).then(responseToResolve);
}

// authorize - check token (contained in httpOnly cookies)
function authorize() {
  const options = {
    method: 'GET',
    credentials: 'include', // send cookie including httpOnly cookies with jwt
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };
  return fetch(`${backend.baseUrl}/users/me`, options).then(responseToJson);
}

// logout - clear httpOnly cookie on the backend side
function logout() {
  const options = {
    method: 'POST',
    credentials: 'include', // send cookie including httpOnly cookies with jwt
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };
  return fetch(`${backend.baseUrl}/logout`, options).then(responseToResolve);
}

function responseToJson(response) {
  if (!response.ok) {
    return response.text().then((text) => {
      throw new Error(text);
    });
  }
  return response.json();
}

function responseToResolve(response) {
  if (!response.ok) {
    return response.text().then((text) => {
      throw new Error(text);
    });
  }
  return Promise.resolve();
}

export { register, login, authorize, logout };
