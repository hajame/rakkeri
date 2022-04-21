import axios from 'axios';

const trackingsUrl = `${process.env.REACT_APP_BACKEND_URL}/api/trackings`;

let token = null;

function now() {
  return new Date().toISOString();
}

const startTracking = async (user, project, task) => {
  const config = {
    headers: { Authorization: token },
  };
  const tracking = {
    startTime: now(),
    user: {
      id: user.id,
    },
    project: {
      id: project.id,
    },
    task: {
      id: task.id,
    },
  };
  const response = await axios.post(
    `${trackingsUrl}/`,
    tracking,
    config,
  );
  return response.data;
};


const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { setToken, startTracking };