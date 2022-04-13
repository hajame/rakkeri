import { useState, useEffect } from "react";
import userService from "../services/users";
import projectService from "../services/projects";

import LoginForm from "./LoginForm";
import Projects from "./Projects";
import Project from "./Project";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const Home = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);

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
        {user !== null && (
          <Projects
            user={user}
            projects={projects}
            setProjects={setProjects}
            setProject={setProject}
          />
        )}
        {project !== null && <Project project={project} />}
        {console.log(project)}
      </Box>
    </Container>
    // </ThemeProvider>
  );
};
