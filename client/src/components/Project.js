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
                   updateProjectState,
                   updateActiveTracking,
                   updateTracking,
                   tasks,
                   activeTracking,
                   setActiveTracking,
                 }) => {

  const stopTracking = async () => {
    const updatedTracking = await trackingService.stopTracking(activeTracking);
    updateProjectState(updatedTracking);
    setActiveTracking(null);
  };

  const startTracking = async taskName => {
    if (!taskName) {
      return;
    }
    let task = await taskService.findOrCreate(taskName, tasks);
    const newTracking = await trackingService.startTracking(user, project, task);
    updateProjectState(newTracking);
    setActiveTracking(newTracking);
  };

  const resetActiveTracking = async task => {
    if (!activeTracking) {
      await startTracking(task.name);
      return;
    }
    const oldActiveTracking = await trackingService.stopTracking(activeTracking);
    const newActiveTracking = await trackingService.startTracking(user, project, task);
    updateActiveTracking(oldActiveTracking, newActiveTracking);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography component='div' variant='h6' mb={1}>
        {project.name}
      </Typography>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {activeTracking === null ?
          <StartTrackingDialogButton
            startTracking={startTracking} project={project} tasks={tasks}
          />
          :
          <Button color={'warning'} onClick={stopTracking} variant='contained'
                  sx={{ mt: 0.5, mb: 1, marginRight: '12px' }}>
            Stop tracking
          </Button>
        }
        <ReportDialogButton project={project} type={'tasks'} />
        <ReportDialogButton project={project} type={'helsinki'} />
      </Box>
      <TrackingList trackingsByDate={trackingService.getTrackingsByDate(project.trackings)}
                    resetActiveTracking={resetActiveTracking}
                    updateTracking={updateTracking}
                    tasks={tasks}
      />
    </Box>
  );
};

export default Project;
