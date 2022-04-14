import { useState, useEffect } from "react";
import userService from "../services/users";
import projectService from "../services/projects";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Project = ({ project, setProject }) => {
  const createTask = async () => {
    const name = prompt("Task name", "");
    if (!name) {
      return;
    }
    const updatedProject = await projectService.addTask(name, project);
    updatedProject.tasks.sort((a, b) => a.name.localeCompare(b.name));
    setProject(updatedProject);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography component="div" variant="h6" mb={3}>
        {project.name}
      </Typography>
      <Typography component="div" variant="h6">
        Tasks
      </Typography>
      <Button onClick={createTask} variant="contained" sx={{ mt: 1, mb: 1 }}>
        New task
      </Button>
      <List>
        {project.tasks.map((task) => (
          <ListItem alignItems="center" disablePadding key={task.id}>
            <ListItemButton>{task.name}</ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Project;
