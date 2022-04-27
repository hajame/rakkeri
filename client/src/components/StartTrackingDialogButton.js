import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const StartTrackingDialogButton = ({ startTracking }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function submit(taskName) {
    startTracking(taskName);
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleClick} variant='contained' sx={{ mt: 1, mb: 0 }}>
        {'Start tracking'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>New Tracking</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>
          What are you doing?
        </DialogContentText>*/}
          <TextField
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                submit(e.target.value);
              }
            }}
            autoFocus
            fullWidth
            margin='dense'
            id='task_text'
            label='What are you doing?'
            type='text'
            variant='outlined'
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartTrackingDialogButton;
