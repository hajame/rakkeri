import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

import taskService from '../services/tasks';

const Task = ({ task, project, setProject, activeTask, setActiveTask }) => {


  const startTracking = async (task) => {
    const tracking = {
      startTime: new Date().toUTCString(),
    };
    const savedTracking = await taskService.startTracking(project, task, tracking);
    task.trackings = { ...task.trackings, savedTracking };
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
