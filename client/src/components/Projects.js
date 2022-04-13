import { useState, useEffect } from "react";
import userService from "../services/users";
import projectService from "../services/projects";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Projects = ({ user, projects, setProjects, setProject }) => {
  const createProject = async () => {
    const name = prompt("Please name your project", "name");
    const response = await projectService.create(name, user);
    const newProjects = response.projects.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProjects(newProjects);
  };

  const setFocused = (project) => {
    setProject(project);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography component="h" variant="h6">
        Select a project
      </Typography>
      <List>
        {projects.map((p) => (
          <ListItem disablePadding key={p.id}>
            <ListItemButton onClick={() => setFocused(p)}>
              {p.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        onClick={createProject}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        New project
      </Button>
    </Box>
  );
};

export default Projects;
