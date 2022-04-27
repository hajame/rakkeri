import projectService from '../services/projects';

const fetchProjects = async (user) => {
  try {
    let fetchedProjects = await projectService.getProjects(user);
    fetchedProjects.sort((a, b) => a.name.localeCompare(b.name));
    return fetchedProjects;
  } catch {
    console.error('failed to fetch projects');
  }
};

const getActiveProject = (fetchedProjects) => {
  const activeProjects = fetchedProjects.filter(p => {
    return p.trackings
      .filter(tracking => !tracking.endTime)
      .length > 0;
  });
  return activeProjects[0];
};

const getTaskSet = (fetchedProjects) => {
  let taskSet = new Set();
  fetchedProjects.forEach((p) => {
    p.tasks.forEach((t) => {
      taskSet.add(t);
    })
  })
  return taskSet;
};

const getActiveTracking = activeProject => {
  const activeTrackings = activeProject.trackings.filter(tracking => !tracking.endTime);
  return activeTrackings[0];
};

export default { fetchProjects, getActiveProject, getActiveTracking, getTaskSet };
