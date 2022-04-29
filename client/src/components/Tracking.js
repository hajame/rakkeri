import * as React from 'react';
import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import time from '../services/time';

const Tracking = ({ tracking, updateTracking }) => {

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [startTimeValue, setStartTimeValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');

  const openDialog = () => {
    setStartTimeValue(time.getHHMM(tracking.startTime));
    setEndTimeValue(time.getHHMM(tracking.endTime));
    setEditDialogOpen(true);
  };

  const closeDialog = tracking => {
    setStartTimeValue(time.getHHMM(tracking.startTime));
    setEndTimeValue(time.getHHMM(tracking.endTime));
    setEditDialogOpen(false);
  };

  const handleUpdateTracking = () => {
    const startDate = new Date(tracking.startTime);
    time.setHHMM(startDate, startTimeValue);
    const endDate = new Date(tracking.endTime);
    time.setHHMM(endDate, endTimeValue);
    const newTracking = {
      ...tracking,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    };
    updateTracking(newTracking);
    closeDialog(newTracking);
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
        {time.toDDMMYY(tracking.startTime)} [{time.getDuration(tracking.startTime, tracking.endTime)}] {tracking.task.name}
      </ListItemButton>

      {
        editDialogOpen ?
          <Dialog
            open={editDialogOpen}
            onClose={closeDialog}
            fullWidth
            maxWidth='sm'
          >
            <DialogTitle>Edit tracking</DialogTitle>
            <DialogContent>
              <TextField
                value={startTimeValue}
                error={!time.validateHHMM(startTimeValue)}
                autoFocus
                margin='dense'
                id={'tracking_startTime_field_' + tracking.id}
                onChange={(event) => {
                  setStartTimeValue(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTracking();
                  }
                }}
                label='Start Time'
                type='text'
                variant='outlined'
              />
              <TextField
                value={endTimeValue}
                error={!time.validateHHMM(endTimeValue)}
                autoFocus
                margin='dense'
                id={'tracking_endTime_field_' + tracking.id}
                onChange={(event) => {
                  setEndTimeValue(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTracking();
                  }
                }}
                label='End Time'
                type='text'
                variant='outlined'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => closeDialog(tracking)}>Cancel</Button>
              <Button variant='contained' onClick={handleUpdateTracking}>Save</Button>
            </DialogActions>
          </Dialog>
          : ''
      }

    </ListItem>
  );

};

export default Tracking;
