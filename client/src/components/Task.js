import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

const Task = ({ task, project, setProject }) => {
  const handleTracking = async (task) => {
    alert(task.name);
  };

  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => handleTracking(task)}
        >
          <Icon color="primary">play_arrow</Icon>
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
      minutes =
        minutes +
        (new Date(task.trackings[i].endTime) -
          new Date(task.trackings[i].startTime)) /
          1000 /
          60;
    }
    return minutes;
  }
};

export default Task;
