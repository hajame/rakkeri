import axios from 'axios';

import trackingService from './trackings';
import { backendUrl } from './config';

const usersUrl = `${backendUrl}/api/users`;
const projectsUrl = `${backendUrl}/api/projects`;

let token = null;

const getProjects = async (user) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${usersUrl}/${user.id}/projects`, config);
  let projects = response.data;
  projects.forEach((p) => trackingService.sortTrackings(p.trackings));
  return projects;
};

const create = async (name, user) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = { name: name };
  const response = await axios.post(
    `${usersUrl}/${user.id}/projects`,
    data,
    config,
  );
  return response.data;
};

const addTask = async (name, project) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = { name: name };
  const response = await axios.post(
    `${projectsUrl}/${project.id}/tasks`,
    data,
    config,
  );
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { getProjects, setToken, create, addTask };
