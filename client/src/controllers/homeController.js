import projectService from '../services/projects';

const fetchProjects = async (user) => {
  let fetchedProjects = await projectService.getProjects(user);
  fetchedProjects.sort((a, b) => a.name.localeCompare(b.name));
  return fetchedProjects;
};

const getActiveProject = (fetchedProjects) => {
  const activeProjects = fetchedProjects.filter(p => {
    return p.trackings
      .filter(tracking => !tracking.endTime)
      .length > 0;
  });
  return activeProjects[0];
};

const getTaskMap = (fetchedProjects) => {
  let taskMap = new Map();
  fetchedProjects.forEach((p) => {
    p.tasks.forEach((t) => {
      taskMap.set(t.name, t);
    });
  });
  return taskMap;
};

const getActiveTracking = activeProject => {
  const activeTrackings = activeProject.trackings.filter(tracking => !tracking.endTime);
  return activeTrackings[0];
};

export default { fetchProjects, getActiveProject, getActiveTracking, getTaskMap };
