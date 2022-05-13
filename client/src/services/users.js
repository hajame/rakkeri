import axios from 'axios';

const usersUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;
const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/api/login`;
const resetPasswordUrl = `${process.env.REACT_APP_BACKEND_URL}/api/reset-password`;

let token = null;

const create = async (credentials) => {
  const response = await axios.post(usersUrl, credentials);
  return response;
};

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

const resetPassword = async (email) => {
  const data = { email: email };
  const response = await axios.post(resetPasswordUrl, data);
  return response;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const hasTokenExpired = user => {
  return !user.tokenExpirationDate || new Date(user.tokenExpirationDate) < new Date();
};

export default { create, login, resetPassword, setToken, token, hasTokenExpired };

