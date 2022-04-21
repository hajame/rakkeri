import { useState, useEffect } from 'react';
import userService from '../services/users';
import taskService from '../services/tasks';
import trackingService from '../services/trackings';

import Tracking from './Tracking';

import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Project = ({ user, project, setProject, projects, setProjects, activeTask, setActiveTask }) => {
  const replaceOldProject = (updatedProject) => {
    return [
      ...projects.filter((p) => p.id !== updatedProject.id),
      updatedProject
    ];
  };

  const startTracking = async () => {
    const name = prompt('What are you doing?', '');
    if (!name) {
      return;
    }
    const newTask = await taskService.addTask(name, project);
    const newTracking = await trackingService.startTracking(user, project, newTask);
    const updatedProject = {
      ...project,
      trackings: [
        ...project.trackings,
        newTracking,
      ],
    };
    setProject(updatedProject);
    let updatedProjects = replaceOldProject(updatedProject);
    updatedProjects.sort((a, b) => a.name.localeCompare(b.name));
    setProjects(updatedProjects);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography component='div' variant='h6' mb={3}>
        {project.name}
      </Typography>
      <Typography component='div' variant='h6'>
        Tracked items
      </Typography>
      <Button onClick={startTracking} variant='contained' sx={{ mt: 1, mb: 1 }}>
        Start tracking
      </Button>
      <List>
        {project.trackings.map((tracking) => (
          <Tracking key={tracking.id} tracking={tracking} />
        ))}
      </List>

    </Box>
  );
};

export default Project;
