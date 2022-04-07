import { useState } from "react";
import userService from "../services/users";
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await userService.login({ username, password });
    } catch (e) {
      console.error("Error when logging in", e);
    }
    setUsername("");
    setPassword("");
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
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
      </Box>
    </Container>
    // </ThemeProvider>
  );
};
