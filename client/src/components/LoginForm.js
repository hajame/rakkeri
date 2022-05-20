import { useState } from 'react';
import userService from '../services/users';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CssBaseline from '@mui/material/CssBaseline';

const LoginForm = ({ setUser, updateState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [openError, setOpenError] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    try {
      const user = await userService.login({ username, password });
      setUser(user);
      userService.setToken(user.token);
      window.localStorage.setItem('rakkeriAppUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
      updateState();
    } catch (e) {
      console.error('Error when logging in', e);
      setOpenError(true);
    }
  };

  return (
    <Box component='form' onSubmit={login} noValidate sx={{ mt: 1 }}>
      <Typography component='h1' variant='h5'>
        Sign in to Räkkeri ⏱
      </Typography>

      <TextField
        margin='normal'
        required
        fullWidth
        id='username'
        value={username}
        label='Username'
        name='username'
        autoComplete='username'
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        value={password}
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Sign in
      </Button>
      <Grid container>
        <Grid item
              sx={{ marginTop: 1 }}
        >
          <Link href='/rakkeri/signup' variant='body2'>
            {'Don\'t have an account? Sign Up'}
          </Link>
        </Grid>
        <Grid item
              sx={{ marginTop: 1, marginLeft: 3 }}
        >
          <Link href='/rakkeri/forgot-password' variant='body2'>
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Snackbar open={openError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity='error' sx={{ width: '100%' }}>
          <AlertTitle>Error</AlertTitle>
          Wrong username or password.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
