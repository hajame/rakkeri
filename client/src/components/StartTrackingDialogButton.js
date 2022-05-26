import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const StartTrackingDialogButton = ({ startTracking, project, tasks }) => {
  const [open, setOpen] = useState(false);
  const [taskNameValue, setTaskNameValue] = useState('');

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  function handleStartTracking(taskName) {
    startTracking(taskName.trim());
    closeDialog();
  }

  return (
    <Box>
      <Button onClick={openDialog} variant='contained' sx={{ mt: 0.5, mb: 1, marginRight: '12px' }}>
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
                handleStartTracking(taskNameValue);
              }
            }}
            options={Array.from(tasks.keys())}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                label='🔨 What are you doing?'
                margin='dense'
                InputProps={{
                  ...params.InputProps,
                  type: 'text',
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant='contained' onClick={() => handleStartTracking(taskNameValue)}>Start</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StartTrackingDialogButton;
