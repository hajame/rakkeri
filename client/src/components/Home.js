import { useState, useEffect } from "react";
import userService from "../services/users";
import projectService from "../services/projects";

import LoginForm from "./LoginForm";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const Home = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const updateState = async () => {
    const userJSON = window.localStorage.getItem("rakkeriAppUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      userService.setToken(user.token);
      projectService.setToken(user.token);
      try {
        let projects = await projectService.getProjects(user);
        projects.sort((a, b) => a.name.localeCompare(b.name));
        setProjects(projects);
      } catch {}
    }
  };

  useEffect(() => {
    updateState();
  }, []);

  const projectView = () => (
    <Box sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Select a project
      </Typography>
      <List>
        {projects.map((p) => (
          <ListItem disablePadding key={p.id}>
            <ListItemButton href={"projects/" + p.id}>{p.name}</ListItemButton>
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

  const createProject = async () => {
    const name = prompt("Please name your project", "name");
    const response = await projectService.create(name, user);
    const newProjects = response.projects.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProjects(newProjects);
  };

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {user === null && (
          <LoginForm setUser={setUser} updateState={updateState} />
        )}
        {user !== null && projectView()}
      </Box>
    </Container>
    // </ThemeProvider>
  );
};
