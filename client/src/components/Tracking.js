import { useEffect, useState } from 'react';
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
import Box from '@mui/material/Box';

const Tracking = ({ tracking, updateTracking, tasks }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [startTimeValue, setStartTimeValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [taskNameValue, setTaskNameValue] = useState('');

  const [elapsedTime, setElapsedTime] = useState('--:--:--');

  const openDialog = () => {
    setStartTimeValue(time.getHHMM(tracking.startTime));
    setEndTimeValue(time.getHHMM(tracking.endTime));
    setStartDateValue(time.getDateFieldFormat(tracking.startTime));
    setEndDateValue(time.getDateFieldFormat(tracking.endTime));
    setTaskNameValue(tracking.task.name);
    setEditDialogOpen(true);
  };

  const closeDialog = (tracking) => {
    setStartTimeValue(time.getHHMM(tracking.startTime));
    setEndTimeValue(time.getHHMM(tracking.endTime));
    setEditDialogOpen(false);
  };

  const handleUpdateTracking = () => {
    const startDate = time.dateFrom(startDateValue, startTimeValue);
    let endDate = null;
    if (tracking.endTime) {
      endDate = time.dateFrom(endDateValue, endTimeValue);
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

  useEffect(() => {
    if (tracking.endTime) {
      return;
    }
    let timer = setTimeout(() => {
      setElapsedTime(time.HHMMSSElapsedSince(tracking.startTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const calendarFieldWidth = '49%';
  const timeFieldRightMargin = '2%';
  const fieldBottomMargin = 0.5;
  const timeFieldWidth = '20%';
  const timeFieldMinWidth = '105px';
  return (
    <ListItem alignItems='flex-start' disablePadding>
      <ListItemButton onClick={() => openDialog(tracking)}>
        {!tracking.endTime ? (
          <ListItemText
            primary={`🔨 ${tracking.task.name}`}
            primaryTypographyProps={{
              fontWeight: 'bolder',
            }}
            secondary={`⏱ ${elapsedTime} (${time.getHHMM(tracking.startTime)} - )`}
          />
        ) : (
          <ListItemText
            primary={`${tracking.task.name}`}
            secondary={`${time.getDuration(
              tracking.startTime,
              tracking.endTime,
            )} (${time.getHHMM(tracking.startTime)} - ${time.getHHMM(tracking.endTime)})`}
          />
        )}
      </ListItemButton>

      {editDialogOpen ? (
        <Dialog
          open={editDialogOpen}
          onClose={closeDialog}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>
            {tracking.endTime ? 'Edit tracking' : 'Edit active tracking'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{
              mb: fieldBottomMargin,
              display: 'flex',
              flexDirection: 'row',
            }}>
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
                label='🕤 Start Time'
                type='text'
                variant='outlined'
                sx={{ width: timeFieldWidth, minWidth: timeFieldMinWidth, mr: timeFieldRightMargin }}
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
                label='🕞 End Time'
                type='text'
                variant='outlined'
                sx={{
                  display: tracking.endTime ? '' : 'none',
                  minWidth: timeFieldMinWidth,
                  width: timeFieldWidth,
                }}
              />
            </Box>
            <Autocomplete
              id='task_text'
              freeSolo
              value={taskNameValue}
              onInputChange={(event, newInputValue) => {
                setTaskNameValue(newInputValue);
              }}
              sx={{ width: '100%', mb: fieldBottomMargin + 2 }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleUpdateTracking();
                }
              }}
              options={Array.from(tasks.keys())}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='🔨 Task'
                  margin='dense'
                  InputProps={{
                    ...params.InputProps,
                    type: 'text',
                  }}
                  variant='outlined'
                />
              )}
            />
            <Box sx={{ mb: 0 }}>
              <TextField
                value={startDateValue}
                error={false}
                margin='dense'
                id={'tracking_startDate_field_' + tracking.id}
                onChange={(event) => {
                  setStartDateValue(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTracking();
                  }
                }}
                label='📅 Start Date'
                type='date'
                variant='outlined'
                sx={{ width: calendarFieldWidth, mr: timeFieldRightMargin }}
              />
              <TextField
                value={endDateValue}
                error={false}
                disabled={!tracking.endTime}
                margin='dense'
                id={'tracking_endDate_field_' + tracking.id}
                onChange={(event) => {
                  setEndDateValue(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTracking();
                  }
                }}
                label='📅 End Date'
                type='date'
                variant='outlined'
                sx={{
                  display: tracking.endTime ? '' : 'none',
                  width: calendarFieldWidth,
                }}
              />
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog(tracking)}>Cancel</Button>
            <Button variant='contained' onClick={handleUpdateTracking}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
    </ListItem>
  );
};

export default Tracking;
