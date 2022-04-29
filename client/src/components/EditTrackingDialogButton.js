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

const EditTrackingDialogButton = ({}) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

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
        <DialogTitle>Hello</DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={}>Cancel</Button>
          <Button onClick={}>Start</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTrackingDialogButton;
