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

const stopTracking = async (tracking) => {
  const config = {
    headers: { Authorization: token },
  };
  const updatedTracking = {
    id: tracking.id,
    startTime: tracking.startTime,
    endTime: now(),
    user: {
      id: tracking.user.id,
    },
    project: {
      id: tracking.project.id,
    },
    task: {
      id: tracking.task.id,
    },
  };
  const response = await axios.post(
    `${trackingsUrl}/`,
    updatedTracking,
    config,
  );
  return response.data;
};

const updateTracking = async (tracking) => {
  const config = {
    headers: { Authorization: token },
  };
  const updatedTracking = {
    id: tracking.id,
    startTime: tracking.startTime,
    endTime: tracking.endTime,
    user: {
      id: tracking.user.id,
    },
    project: {
      id: tracking.project.id,
    },
    task: {
      id: tracking.task.id,
    },
  };
  const response = await axios.post(
    `${trackingsUrl}/`,
    updatedTracking,
    config,
  );
  return response.data;
};

const sortTrackings = trackings => {
  trackings.sort((a, b) => {
    if (a.endTime === null) {
      return -1;
    }
    if (b.endTime === null) {
      return 1;
    }
    return b.endTime.localeCompare(a.endTime);
  });
};


const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { setToken, startTracking, stopTracking, updateTracking, sortTrackings };
