import axios from 'axios';

import { backendUrl } from './config';

const usersUrl = `${backendUrl}/api/users`;
const loginUrl = `${backendUrl}/api/login`;
const sendResetPasswordEmailUrl = `${backendUrl}/api/users/reset-password-email`;
const resetPasswordUrl = `${backendUrl}/api/users/reset-password`;

let token = null;

const create = async (credentials) => {
  const response = await axios.post(usersUrl, credentials);
  return response;
};

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

const sendResetPasswordLink = async (email) => {
  const data = { email: email };
  const response = await axios.post(sendResetPasswordEmailUrl, data);
  return response;
};

const resetPassword = async (resetToken, newPassword) => {
  const data = { token: resetToken, password: newPassword };
  const response = await axios.post(resetPasswordUrl, data);
  return response;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const hasTokenExpired = user => {
  return !user.tokenExpirationDate || new Date(user.tokenExpirationDate) < new Date();
};

export default { create, login, sendResetPasswordLink, resetPassword, setToken, token, hasTokenExpired };

