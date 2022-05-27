import { useState } from 'react';
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

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendResetEmail = async () => {
    try {
      await userService.sendResetPasswordLink(email);
      setOpenSuccess(true);
      setEmail('');
    } catch (e) {
      setErrorMessage('Failed to reset password.');
      setOpenError(true);
    }
  };

  const handleSendResetEmail = async (event) => {
    event.preventDefault();
    if (!validations.validateEmail(email)) {
      setErrorMessage('Invalid email address. Please try again.');
      setOpenError(true);
      return;
    }
    await sendResetEmail();
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
          <Typography component='h1' variant='h5' sx={{ mb: 1 }}>
            Forgot password
          </Typography>
          <Typography component='p'>
            A password reset link will be sent to your email.
          </Typography>
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Send password reset link
          </Button>
        </Box>
      </Box>
      <Snackbar open={openSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity='success' sx={{ width: '100%' }}>
          <AlertTitle>Success!</AlertTitle>
          Check your email for further instructions 🙂
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
