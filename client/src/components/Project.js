import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import taskService from '../services/tasks';
import trackingService from '../services/trackings';

import StartTrackingDialogButton from './StartTrackingDialogButton';
import TrackingList from './TrackingList';
import ReportDialogButton from './ReportDialogButton';

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

  const stopTracking = async () => {
    const updatedTracking = await trackingService.stopTracking(activeTracking);
    updateProjectState(updatedTracking);
    setActiveTracking(null);
  };

  const updateTracking = async tracking => {
    const updatedTracking = await trackingService.updateTracking(tracking);
    updateProjectState(updatedTracking);
  };

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
      <Typography component='div' variant='h6' mb={1}>
        {project.name}
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        {activeTracking === null ?
          <StartTrackingDialogButton
            startTracking={startTracking} project={project} tasks={tasks}
          />
          :
          <Button color={'warning'} onClick={stopTracking} variant='contained'
                  sx={{ mt: 1, mb: 0, marginRight: '12px' }}>
            Stop tracking
          </Button>
        }
        <ReportDialogButton project={project} type={'tasks'} />
        <ReportDialogButton project={project} type={'helsinki'} />
      </Box>
      <TrackingList trackings={project.trackings} updateTracking={updateTracking} />
    </Box>
  );
};

export default Project;
