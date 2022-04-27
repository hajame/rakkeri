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

const StartTrackingDialogButton = ({ startTracking, tasks }) => {
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
        Start Tracking
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Start Tracking</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>
          What are you doing?
        </DialogContentText>*/}
          <Autocomplete
            fullWidth
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                submit(e.target.value);
              }
            }}
            freeSolo
            id='task_text'
            disableClearable
            options={['testing', 'names']
              //.map((option) => option.title)
            }
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
      </Dialog>
    </div>
  );
};

export default StartTrackingDialogButton;
