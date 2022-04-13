import axios from "axios";
const usersUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

let token = null;

const getProjects = async (user) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${usersUrl}/${user.id}/projects`, config);
  return response.data;
};

const create = async (name, user) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = { name: name };
  const response = await axios.post(
    `${usersUrl}/${user.id}/projects`,
    data,
    config
  );
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { getProjects, setToken, create };
