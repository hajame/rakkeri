import { useState } from 'react';
import userService from '../services/users';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import ListSubheader from '@mui/material/ListSubheader';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function validateEmail(email) {
  // regex from w3docs.com
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

const validateField = (fieldText, min, max) => {
  return fieldText.length > min && fieldText.length < max;
};

const validatePassword = (password) => {
  return validateField(password, 10, 65);
};

const validateUsername = (username) => {
  return validateField(username, 8, 65);
};


export const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  function validateFields() {
    return validateEmail(email) && validatePassword(password) && validateUsername(username);
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      if (!validateFields()) {
        setOpenError(true);
        return;
      }
      await userService.create({ username, email, password });
      setOpenSuccess(true);
    } catch (e) {
      console.error('Error in creating new user', e);
    }
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    // <ThemeProvider theme={theme}>
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
            error={username === '' ? false : !validateUsername(username)}
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
            error={email === '' ? false : !validateEmail(email)}
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
            error={password === '' ? false : !validatePassword(password)}
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
            <ListItem sx={{ paddingLeft: '2em' }}>
              👤 Username length 8-64 chars
            </ListItem>
            <ListItem sx={{ paddingLeft: '2em' }}>
              🔑 Password length 10-64 chars
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
              <Link href='/' variant='body2'>
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
          <Alert onClose={() => setOpenSuccess(false)} severity='success' sx={{ width: '100%' }}>
            Success! Now you can Log in 🙂
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
          <Alert onClose={() => setOpenError(false)} severity='error' sx={{ width: '100%' }}>
            Some of the fields have errors. Edit and try again.
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
    // </ThemeProvider>
  );
};
