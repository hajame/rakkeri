import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

import taskService from '../services/tasks';

const Task = ({ task, project, setProject, activeTask, setActiveTask }) => {


  function now() {
    return new Date().toISOString();
  }

  const startTracking = async (task) => {
    if (activeTask !== null) {
      console.log(activeTask);
      const activeTracking = activeTask.trackings.find((t) => t.endTime === null);
      const endedTracking = {
        ...activeTracking,
        startTime: new Date(activeTracking.startTime).toISOString(),
        endTime: now(),
      };
      try {
        const updatedTracking = await taskService.update(project, task, endedTracking);
        activeTask.trackings = activeTracking.filter((t) => t.id === activeTracking.id).push(endedTracking);
      } catch (e) {
        console.error('failed to update active tracking', endedTracking, e);
      }
    }
    const tracking = {
      startTime: now(),
    };
    const savedTracking = await taskService.startTracking(project, task, tracking);
    task.trackings = [...task.trackings, savedTracking];
    setActiveTask(task);
  };

  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='comments'
          onClick={() => startTracking(task)}
        >
          <Icon color='primary'>play_arrow</Icon>
        </IconButton>
      }
      disablePadding
    >
      <ListItemText
        primary={task.name + ` [ ${totalMinutesTracked()} min ]`}
        sx={{ mr: 5 }}
      />
    </ListItem>
  );

  function totalMinutesTracked() {
    let minutes = 0;
    for (const i in task.trackings) {
      const endDate = task.trackings[i].endTime
        ? new Date(task.trackings[i].endTime)
        : new Date();
      minutes =
        minutes + (endDate - new Date(task.trackings[i].startTime)) / 1000 / 60;
    }
    return parseInt(minutes);
  }
};

export default Task;
