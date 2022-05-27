import axios from 'axios';

import trackingService from './trackings';
import time from './time';

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

const findMostRecent = projects => {
  let mostRecent = projects[0];
  for (const project of projects) {
    mostRecent = time.isBiggerThan(
      project.trackings[0].endTime, mostRecent.trackings[0].endTime,
    ) ?
      project : mostRecent;
  }
  return mostRecent;
};
const getUpdatedProject = (projects, tracking) => {
  const projectToUpdate = projects.filter((p) => p.id === tracking.project.id)[0];
  let updatedProject = {
    ...projectToUpdate,
    trackings: [
      ...projectToUpdate.trackings.filter((t) => t.id !== tracking.id),
      tracking,
    ],
    tasks: [
      ...projectToUpdate.tasks.filter((task) => task.id !== tracking.task.id),
      tracking.task,
    ],
  };
  trackingService.sortTrackings(updatedProject.trackings);
  return updatedProject;
};

const replaceOldProject = (projects, updatedProject) => {
  const updatedProjects = [
    ...projects.filter((p) => p.id !== updatedProject.id),
    updatedProject,
  ];
  updatedProjects.sort((a, b) => a.name.localeCompare(b.name));
  return updatedProjects;
};

function replaceInProject(project, oldActiveTracking, newActiveTracking) {
  let updatedProject = {
    ...project,
    trackings: [
      ...project.trackings.filter((t) => t.id !== oldActiveTracking.id && t.id !== newActiveTracking.id),
      oldActiveTracking,
      newActiveTracking,
    ],
    tasks: [
      ...project.tasks.filter((task) => task.id !== newActiveTracking.task.id),
      newActiveTracking.task,
    ],
  };
  trackingService.sortTrackings(updatedProject.trackings);
  return updatedProject;
}

function replaceInProjects(projects, oldActiveTracking, newActiveTracking) {
  const oldActiveProject = getUpdatedProject(projects, oldActiveTracking);
  trackingService.sortTrackings(oldActiveProject.trackings);
  const newActiveProject = getUpdatedProject(projects, newActiveTracking);
  trackingService.sortTrackings(newActiveProject.trackings);
  const updatedProjects = [
    ...projects.filter((p) => p.id !== oldActiveProject.id && p.id !== newActiveProject.id),
    oldActiveProject,
    newActiveProject,
  ];
  updatedProjects.sort((a, b) => a.name.localeCompare(b.name));
  return updatedProjects;
}

const getUpdatedProjects = (projects, oldActiveTracking, newActiveTracking) => {
  if (oldActiveTracking.project.id === newActiveTracking.project.id) {
    const projectToUpdate = projects.filter((p) => p.id === oldActiveTracking.project.id)[0];
    let updatedProject = replaceInProject(projectToUpdate, oldActiveTracking, newActiveTracking);
    return replaceOldProject(projects, updatedProject);
  }
  return replaceInProjects(projects, oldActiveTracking, newActiveTracking);
};

export default {
  getProjects, setToken, create, addTask, findMostRecent, getUpdatedProject,
  replaceOldProject, getUpdatedProjects,
};
