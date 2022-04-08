import axios from "axios";
const usersUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;
const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

let token = null;

const create = async (credentials) => {
  const response = await axios.post(usersUrl, credentials);
  return response;
};

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { create, login, setToken, token };
