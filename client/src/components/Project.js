import taskService from '../services/tasks';
import trackingService from '../services/trackings';

import Tracking from './Tracking';
import StartTrackingDialogButton from './StartTrackingDialogButton';

import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import * as React from 'react';

const Project = ({ user, project, setProject, projects, setProjects, activeTracking, setActiveTracking }) => {
  const replaceOldProject = (updatedProject) => {
    return [
      ...projects.filter((p) => p.id !== updatedProject.id),
      updatedProject,
    ];
  };

  function updateProjectState(newTracking) {
    const updatedProject = {
      ...project,
      trackings: [
        ...project.trackings.filter((t) => t.id !== newTracking.id),
        newTracking,
      ],
    };
    setProject(updatedProject);
    let updatedProjects = replaceOldProject(updatedProject);
    updatedProjects.sort((a, b) => a.name.localeCompare(b.name));
    setProjects(updatedProjects);
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
    const newTask = await taskService.addTask(taskName, project);
    const newTracking = await trackingService.startTracking(user, project, newTask);
    updateProjectState(newTracking);
    setActiveTracking(newTracking);
  };

  const handleTracking = async (taskName) => {
    if (activeTracking !== null) {
      await stopTracking();
      return;
    }
    await startTracking(taskName);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography component='div' variant='h6' mb={3}>
        {project.name}
      </Typography>
      {activeTracking === null ?
        <StartTrackingDialogButton
          startTracking={startTracking}
        />
        :
        <Button onClick={stopTracking} variant='contained' sx={{ mt: 1, mb: 0 }}>
          {'Stop tracking'}
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
