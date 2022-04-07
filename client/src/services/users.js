import axios from "axios";
const usersUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;
const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

const create = async (credentials) => {
  const response = await axios.post(usersUrl, credentials);
  return response;
};

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response;
};

export default { create, login };
