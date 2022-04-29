import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

const StartTrackingDialogButton = ({ startTracking, project, tasks }) => {
  const [open, setOpen] = useState(false);
  const [taskNameValue, setTaskNameValue] = useState('');

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  function submit(taskName) {
    startTracking(taskName);
    closeDialog();
  }

  return (
    <div>
      <Button onClick={openDialog} variant='contained' sx={{ mt: 1, mb: 0 }}>
        Start Tracking
      </Button>
      <Dialog
        open={open}
        onClose={closeDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Start tracking for project <i>{project.name}</i></DialogTitle>
        <DialogContent>
          <Autocomplete
            id='task_text'
            fullWidth
            freeSolo
            onInputChange={(event, newInputValue) => {
              setTaskNameValue(newInputValue);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                submit(taskNameValue);
              }
            }}
            options={Array.from(tasks.keys())}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                label='What are you doing?'
                margin='dense'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant='contained' onClick={() => submit(taskNameValue)}>Start</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StartTrackingDialogButton;
