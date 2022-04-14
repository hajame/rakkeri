import { useState, useEffect } from "react";
import userService from "../services/users";
import projectService from "../services/projects";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Projects = ({ user, project, projects, setProjects, setProject }) => {
  const createProject = async () => {
    const name = prompt("Please name your project", "name");
    if (!name) {
      return;
    }
    const newProjects = await projectService.create(name, user);
    newProjects.sort((a, b) => a.name.localeCompare(b.name));
    setProjects(newProjects);
    setProject(newProjects.find((p) => p.name === name));
  };

  const setFocused = (project) => {
    setProject(project);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography component="div" variant="h6">
        Projects
      </Typography>
      <Button
        onClick={createProject}
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
      >
        Create new
      </Button>
      <List>
        {projects.map((p) => (
          <ListItem alignItems="center" disablePadding key={p.id}>
            <ListItemButton
              dense={true}
              selected={project && project.id === p.id}
              onClick={() => setFocused(p)}
            >
              {p.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Projects;
