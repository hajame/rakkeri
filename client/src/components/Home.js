import { useEffect } from 'react';
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
import List from '@mui/material/List';
import Tracking from './Tracking';

export const Home = ({
                       user,
                       setUser,
                       handleLogout,
                       project,
                       setProject,
                       tasks,
                       setTasks,
                       projects,
                       setProjects,
                       activeTracking,
                       setActiveTracking,
                     }) => {

  const setToken = user => {
    userService.setToken(user.token);
    projectService.setToken(user.token);
    taskService.setToken(user.token);
    trackingService.setToken(user.token);
  };

  const updateState = async () => {
    const userJSON = window.localStorage.getItem('rakkeriAppUser');
    if (!userJSON) {
      return;
    }
    const user = JSON.parse(userJSON);
    if (userService.hasTokenExpired(user)) {
      handleLogout();
      return;
    }
    setUser(user);
    setToken(user);
    let fetchedProjects = await controller.fetchProjects(user);
    setProjects(fetchedProjects);
    setTasks(controller.getTaskMap(fetchedProjects));
    const activeProject = controller.getActiveProject(fetchedProjects);
    if (activeProject) {
      setProject(activeProject);
      const tracking = controller.getActiveTracking(activeProject);
      setActiveTracking(tracking);
    }
  };

  const replaceOldProject = (updatedProject) => {
    return [
      ...projects.filter((p) => p.id !== updatedProject.id),
      updatedProject,
    ];
  };


  const updateProjectState = tracking => {
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
    let updatedProjects = replaceOldProject(updatedProject);
    updatedProjects.sort((a, b) => a.name.localeCompare(b.name));
    setProjects(updatedProjects);
    if (!tasks.has(tracking.task.name)) {
      setTasks(tasks.set(tracking.task.name, tracking.task));
    }
    setProject(updatedProjects.filter((p) => p.id === project.id)[0]);
  };

  useEffect(async () => {
    await updateState();
  }, []);

  const updateTracking = async tracking => {
    let newTask = await taskService.findOrCreate(tracking.task.name, tasks);
    const dto = {
      ...tracking,
      task: newTask,
    };
    const updatedTracking = await trackingService.updateTracking(dto);
    updateProjectState(updatedTracking);
    if (activeTracking && updatedTracking.id === activeTracking.id) {
      setActiveTracking(updatedTracking);
    }
  };

  return (
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
              <List>
                <Tracking key={'activeTrackingButton'} tracking={activeTracking}
                          updateTracking={updateTracking}
                          tasks={tasks}
                />
              </List>
            </Box>
          )}
          {project !== null && (
            <Project user={user}
                     project={project} setProject={setProject}
                     projects={projects} setProjects={setProjects}
                     updateProjectState={updateProjectState}
                     updateTracking={updateTracking}
                     tasks={tasks} setTasks={setTasks}
                     activeTracking={activeTracking} setActiveTracking={setActiveTracking} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
