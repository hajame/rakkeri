import { useState, useEffect } from "react";
import userService from "../services/users";
import projectService from "../services/projects";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Project = ({ project }) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Typography component="h" variant="h5">
        Project: {project.name}
      </Typography>
    </Box>
  );
};

export default Project;
