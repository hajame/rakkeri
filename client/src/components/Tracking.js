import * as React from 'react';
import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';

import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import time from '../services/time';
import Autocomplete from '@mui/material/Autocomplete';

const Tracking = ({ tracking, updateTracking, tasks }) => {

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [startTimeValue, setStartTimeValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');
  const [taskNameValue, setTaskNameValue] = useState('');

  const openDialog = () => {
    setStartTimeValue(time.getHHMM(tracking.startTime));
    setEndTimeValue(time.getHHMM(tracking.endTime));
    setTaskNameValue(tracking.task.name);
    setEditDialogOpen(true);
  };

  const closeDialog = tracking => {
    setStartTimeValue(time.getHHMM(tracking.startTime));
    setEndTimeValue(time.getHHMM(tracking.endTime));
    setEditDialogOpen(false);
  };

  const handleUpdateTracking = () => {
    const startDate = new Date(tracking.startTime);
    time.setHHMM(startDate, startTimeValue.trim());
    let endDate = null;
    if (tracking.endTime) {
      endDate = new Date(tracking.endTime);
      time.setHHMM(endDate, endTimeValue.trim());
    }
    let newTask = { name: taskNameValue.trim() };
    const newTracking = {
      ...tracking,
      task: newTask,
      startTime: startDate.toISOString(),
      endTime: endDate ? endDate.toISOString() : null,
    };
    updateTracking(newTracking);
    closeDialog(newTracking);
  };

  return (
    <ListItem
      alignItems='flex-start' disablePadding
    >
      <ListItemButton
        onClick={() => openDialog(tracking)}
      >
        {
          !tracking.endTime ?
            <ListItemText
              primary={`${tracking.task.name}`}
              primaryTypographyProps={{
                fontWeight: 'bolder',
              }}
              secondary={`⏱ (${time.getHHMM(tracking.startTime)} - )`}
            />
            :
            <ListItemText
              primary={`${tracking.task.name}`}
              secondary={`${time.getDuration(tracking.startTime, tracking.endTime)} (${time.getHHMM(tracking.startTime)} - ${time.getHHMM(tracking.endTime)})`}
            />
        }
      </ListItemButton>

      {
        editDialogOpen ?
          <Dialog
            open={editDialogOpen}
            onClose={closeDialog}
            fullWidth
            maxWidth='sm'
          >
            <DialogTitle>{tracking.endTime ? 'Edit tracking' : 'Edit active tracking'}</DialogTitle>
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
                value={tracking.endTime ? endTimeValue : undefined}
                error={!time.validateHHMM(endTimeValue)}
                disabled={!tracking.endTime}
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
              <Autocomplete
                id='task_text'
                fullWidth
                freeSolo
                value={taskNameValue}
                onInputChange={(event, newInputValue) => {
                  setTaskNameValue(newInputValue);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTracking();
                  }
                }}
                options={Array.from(tasks.keys())}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Task'
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
