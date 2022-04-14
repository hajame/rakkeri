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
    <Box
      sx={
        user === null
          ? {
              marginTop: 4,
              marginLeft: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }
          : { display: "flex" }
      }
    >
      <CssBaseline />
      {user === null && (
        <LoginForm setUser={setUser} updateState={updateState} />
      )}
      <Box
        sx={{
          marginTop: 4,
          marginLeft: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {user !== null && (
          <Projects
            user={user}
            projects={projects}
            setProjects={setProjects}
            setProject={setProject}
          />
        )}
      </Box>
      <Box
        sx={{
          marginTop: 4,
          marginLeft: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {project !== null && <Project project={project} />}
      </Box>
    </Box>
    // </ThemeProvider>
  );
};
