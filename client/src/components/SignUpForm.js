import userService from '../services/users';
import validations from '../services/inputValidations';

import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';

const requirementStyle = { paddingLeft: '2em', fontSize: 14 };

export const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function validateFields() {
    return validations.validateEmail(email)
      && validations.validatePassword(password)
      && validations.validateUsername(username);
  }

  const createNewUser = async () => {
    try {
      await userService.create({ username, email, password });
      setOpenSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (e) {
      setErrorMessage('Username or email is taken.');
      setOpenError(true);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      setErrorMessage('Some of the fields have errors. Please try again.');
      setOpenError(true);
      return;
    }
    await createNewUser();
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component='form' onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <Typography component='h1' variant='h5'>
            Create a new account
          </Typography>

          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            value={username}
            error={username === '' ? false : !validations.validateUsername(username)}
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            value={email}
            error={email === '' ? false : !validations.validateEmail(email)}
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            value={password}
            error={password === '' ? false : !validations.validatePassword(password)}
            label='Password'
            name='password'
            type='password'
            autoComplete='current-password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <List disablePadding={true} dense={true}
          >
            <ListSubheader>
              Requirements
            </ListSubheader>
            <ListItem sx={requirementStyle}>
              👤 Username must be 6–64 characters long
            </ListItem>
            <ListItem sx={requirementStyle}>
              🔑 Password must be 10–64 characters long
            </ListItem>
          </List>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/rakkeri' variant='body2'>
                {'Already have an account? Log In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={openSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity='success' sx={{ width: '100%' }}>
          <AlertTitle>Success!</AlertTitle>
          Now you can <Link href='/rakkeri'>{'Log In'}</Link> 🙂
        </Alert>
      </Snackbar>
      <Snackbar open={openError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity='error' sx={{ width: '100%' }}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
