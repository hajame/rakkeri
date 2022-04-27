import taskService from '../services/tasks';
import trackingService from '../services/trackings';

import Tracking from './Tracking';
import StartTrackingDialogButton from './StartTrackingDialogButton';

import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Project = ({
                   user,
                   project,
                   setProject,
                   projects,
                   setProjects,
                   tasks,
                   setTasks,
                   activeTracking,
                   setActiveTracking,
                 }) => {
  const replaceOldProject = (updatedProject) => {
    return [
      ...projects.filter((p) => p.id !== updatedProject.id),
      updatedProject,
    ];
  };

  function updateProjectState(tracking) {
    const projectToUpdate = projects.filter((p) => p.id === tracking.project.id)[0];
    const updatedProject = {
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
    let updatedProjects = replaceOldProject(updatedProject);
    updatedProjects.sort((a, b) => a.name.localeCompare(b.name));
    setProjects(updatedProjects);
    if (!tasks.has(tracking.task.name)) {
      setTasks(tasks.set(tracking.task.name, tracking.task));
    }
    setProject(updatedProjects.filter((p) => p.id === project.id)[0]);
  }

  async function stopTracking() {
    const updatedTracking = await trackingService.stopTracking(activeTracking);
    updateProjectState(updatedTracking);
    setActiveTracking(null);
  }

  const startTracking = async taskName => {
    if (!taskName) {
      return;
    }
    let task = tasks.has(taskName) ?
      tasks.get(taskName)
      : await taskService.addTask(taskName, project);
    const newTracking = await trackingService.startTracking(user, project, task);
    updateProjectState(newTracking);
    setActiveTracking(newTracking);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography component='div' variant='h6' mb={3}>
        {project.name}
      </Typography>
      {activeTracking === null ?
        <StartTrackingDialogButton
          startTracking={startTracking} tasks={tasks}
        />
        :
        <Button color={'warning'} onClick={stopTracking} variant='contained' sx={{ mt: 1, mb: 0 }}>
          Stop tracking
        </Button>
      }
      <List>
        {project.trackings.map((tracking) => (
          <Tracking key={tracking.id} tracking={tracking} />
        ))}
      </List>
    </Box>
  );
};

export default Project;
