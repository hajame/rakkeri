import axios from 'axios';

import timeService from './time';

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

const getTrackingsByDate = trackings => {
  return trackings.reduce((trackings, tracking) => {
    const date = timeService.toDDMMYY(tracking.startTime);
    trackings[date] = trackings[date] || [];
    trackings[date].push(tracking);
    return trackings;
  }, {});
};

function getTotalSeconds(trackings) {
  let totalSeconds = 0;
  trackings.forEach(t => {
    const seconds = timeService.getDurationInSeconds(t.startTime, t.endTime);
    totalSeconds += seconds;
  });
  return timeService.HHMMFromSeconds(totalSeconds);
}


const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default {
  setToken,
  startTracking,
  stopTracking,
  updateTracking,
  sortTrackings,
  getTrackingsByDate,
  getTotalSeconds,
};