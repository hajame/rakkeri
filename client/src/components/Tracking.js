import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import TextField from '@mui/material/TextField';

import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import time from '../services/time';

const Tracking = ({ tracking, updateTracking }) => {

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const openDialog = tracking => {
    setEditDialogOpen(true);
  };

  const closeDialog = () => {
    setEditDialogOpen(false);
  };

  const handleUpdateTracking = tracking => {
    tracking.endTime = new Date().toISOString();
    updateTracking(tracking);
    closeDialog();
  };

  return (
    <ListItem
      style={{ display: tracking.endTime ? '' : 'none' }}
      alignItems='flex-start' disablePadding
    >

      <ListItemButton
        dense={false}
        onClick={() => openDialog(tracking)}
      >
        {time.toDDMMYY(tracking.startTime)} [{time.getTime(tracking.startTime, tracking.endTime)}] {tracking.task.name}
      </ListItemButton>

      <Dialog
        open={editDialogOpen}
        onClose={closeDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Hello</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='End Time'
            type='text'
            defaultValue={time.getHHMM(tracking.endTime)}
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={() => handleUpdateTracking(tracking)}>Start</Button>
        </DialogActions>
      </Dialog>

    </ListItem>
  );

};

export default Tracking;
