import { useState, useEffect } from 'react';
import userService from '../services/users';
import projectService from '../services/projects';

import Tracking from './Tracking';

import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Project = ({ project, setProject, activeTask, setActiveTask }) => {
  const startTracking = async () => {
    const name = prompt('What are you doing?', '');
    if (!name) {
      return;
    }
    alert('great!');
    // const updatedProject = await projectService.addTask(name, project);
    // updatedProject.tasks.sort((a, b) => a.name.localeCompare(b.name));
    // setProject(updatedProject);
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
