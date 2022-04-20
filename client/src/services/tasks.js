import axios from 'axios';

const usersUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;
const projectsUrl = `${process.env.REACT_APP_BACKEND_URL}/api/projects`;

let token = null;

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

const startTracking = async (project, task, tracking) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${projectsUrl}/${project.id}/tasks/${task.id}/trackings`,
    tracking,
    config,
  );
  return response.data;
};

const update = async (project, task, tracking) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = {
    startTime: new Date(tracking.startTime).toISOString(),
    endTime: new Date(tracking.endTime).toISOString(),
  };
  console.log(data);
  const response = await axios.put(
    `${projectsUrl}/${project.id}/tasks/${task.id}/trackings/${tracking.id}`,
    data,
    config,
  );
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { setToken, addTask, startTracking, update };
