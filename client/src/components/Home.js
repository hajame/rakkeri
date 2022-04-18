import { useState, useEffect } from 'react';
import userService from '../services/users';
import projectService from '../services/projects';
import taskService from '../services/tasks';

import LoginForm from './LoginForm';
import Projects from './Projects';
import Project from './Project';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const Home = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const updateState = async () => {
    const userJSON = window.localStorage.getItem('rakkeriAppUser');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      userService.setToken(user.token);
      projectService.setToken(user.token);
      taskService.setToken(user.token);
      try {
        let projects = await projectService.getProjects(user);
        projects.sort((a, b) => a.name.localeCompare(b.name));
        setProjects(projects);
      } catch {
      }
    }
  };

  useEffect(() => {
    updateState();
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
            {user !== null && activeTask !== null && (
              <Box
                sx={{
                  marginTop: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <p>active task __ <b>{activeTask.name}</b> __ start
                  time: {new Date(activeTask.trackings[0].startTime).toTimeString()}</p>
              </Box>
            )}
            {project !== null && (
              <Project project={project} setProject={setProject} activeTask={activeTask}
                       setActiveTask={setActiveTask} />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
