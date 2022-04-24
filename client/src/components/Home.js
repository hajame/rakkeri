import { useEffect, useState } from 'react';
import userService from '../services/users';
import projectService from '../services/projects';
import taskService from '../services/tasks';
import trackingService from '../services/trackings';

import controller from '../controllers/homeController';

import LoginForm from './LoginForm';
import Projects from './Projects';
import Project from './Project';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Home = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [activeTracking, setActiveTracking] = useState(null);

  const theme = createTheme({
    palette: {
      mode: 'dark', // always dark mode
    },
  });

  const setToken = user => {
    userService.setToken(user.token);
    projectService.setToken(user.token);
    taskService.setToken(user.token);
    trackingService.setToken(user.token);
  };

  const updateState = async () => {
    const userJSON = window.localStorage.getItem('rakkeriAppUser');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      setToken(user);
      let fetchedProjects = await controller.fetchProjects(user);
      setProjects(fetchedProjects);
      const activeProject = controller.getActiveProject(fetchedProjects);
      if (activeProject) {
        setProject(activeProject);
        const tracking = controller.getActiveTracking(activeProject);
        setActiveTracking(tracking);
      }
    }
  };

  useEffect(async () => {
    await updateState();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={
          user === null
            ? {
              marginTop: 4,
              marginLeft: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }
            : { display: 'flex', flexDirection: 'column', height: '100%' }
        }
      >

        <Box
          sx={
            { display: 'flex', flexDirection: 'row', height: '100%' }
          }
        >
          <CssBaseline />
          {user === null && (
            <LoginForm setUser={setUser} updateState={updateState} />
          )}
          <Box
            sx={{
              marginTop: 4,
              marginLeft: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100vh',
              maxWidth: '15em',
            }}
            style={{
              backgroundColor: '#212121',
            }}
          >
            {user !== null && (
              <Projects
                user={user}
                project={project}
                projects={projects}
                setProjects={setProjects}
                setProject={setProject}
              />
            )}
          </Box>
          <Box
            sx={{
              marginTop: 1,
              marginLeft: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >
            {user !== null && activeTracking !== null && (
              <Box
                sx={{
                  marginTop: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <p>active: __<b>{activeTracking.task.name}</b>__
                  start time: {new Date(activeTracking.startTime).toTimeString().substring(0, 8)}
                </p>
              </Box>
            )}
            {project !== null && (
              <Project user={user} project={project} setProject={setProject} projects={projects}
                       setProjects={setProjects} activeTracking={activeTracking}
                       setActiveTracking={setActiveTracking} />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
