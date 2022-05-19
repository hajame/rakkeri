import { useEffect, useState } from 'react';
import userService from '../services/users';
import validations from '../services/inputValidations';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Link from '@mui/material/Link';

const requirementStyle = { paddingLeft: '2em', fontSize: 14 };

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getTokenFromUrl = () => new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    setToken(getTokenFromUrl());
  }, []);

  const handleSendResetEmail = async (event) => {
    event.preventDefault();
    await resetPassword();
  };

  const resetPassword = async () => {
    try {
      await userService.resetPassword(token, password);
      setOpenSuccess(true);
    } catch (e) {
      setErrorMessage('Failed to reset password.');
      setOpenError(true);
    }
    setPassword('');
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
        <Box component='form' onSubmit={handleSendResetEmail} noValidate sx={{ mt: 1 }}>
          <Typography component='h1' variant='h5'>
            Reset password
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='reset_password_field'
            value={password}
            error={password === '' ? false : !validations.validatePassword(password)}
            label='New password'
            name='reset_password_field'
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Reset password
          </Button>
        </Box>
      </Box>
      <List disablePadding={true} dense={true}
      >
        <ListSubheader>
          Requirements
        </ListSubheader>
        <ListItem sx={requirementStyle}>
          🔑 Password must be 10–64 characters long
        </ListItem>
      </List>
      <Snackbar open={openSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity='success' sx={{ width: '100%' }}>
          <AlertTitle>Success!</AlertTitle>
          <Link href='/rakkeri'>{'Log In'}</Link> with your new password 🙂
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
