import { useState, useEffect } from "react";
import userService from "../services/users";
import projectService from "../services/projects";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        setProjects(projects);
      } catch {}
    }
  };

  useEffect(() => {
    updateState();
  }, []);

  const loginForm = () => (
    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Sign in to Räkkeri
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        value={username}
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        value={password}
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign in
      </Button>
      <Grid container>
        <Grid item>
          <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
        {/* Todo: */}
        {/* <Grid item xs>
          <Link href="" variant="body2">
            Forgot password?
          </Link>
        </Grid> */}
      </Grid>
    </Box>
  );

  const projectView = () => (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Welcome {user.username}
      </Typography>
      <List>
        {projects.map((p) => (
          <ListItem disablePadding key={p.id}>
            <ListItemButton href={"projects/" + p.id}>{p.name}</ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        New project
      </Button>
    </Box>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await userService.login({ username, password });
      setUser(user);
      userService.setToken(user.token);
      window.localStorage.setItem("rakkeriAppUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      updateState();
    } catch (e) {
      console.error("Error when logging in", e);
    }
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
        {user === null && loginForm()}
        {user !== null && projectView()}
      </Box>
    </Container>
    // </ThemeProvider>
  );
};
