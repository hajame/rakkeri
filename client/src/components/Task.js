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
      <ListItemText primary={task.name} />
    </ListItem>
  );
};

export default Task;
