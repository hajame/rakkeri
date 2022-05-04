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
import Box from '@mui/material/Box';
import reportService from '../services/reports';
import Typography from '@mui/material/Typography';

const ReportDialogButton = ({ project, type }) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const copyReportElementText = () => {
    navigator.clipboard.writeText(window.document.getElementById('reportText').innerText);
    closeDialog();
  };

  return (
    <Box>
      <Button onClick={openDialog} variant='contained' color={'secondary'} sx={{ mt: 1, mb: 0, marginRight: '12px' }}>
        {
          type === 'helsinki' ? 'CS-HELSINKI REPORT' : 'TIMES BY TASK'
        }
      </Button>
      <Dialog
        open={open}
        onClose={closeDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogContent>
          <pre
            id='reportText'
            style={{
              fontSize: 11,
            }}
          >

            {
              type === 'helsinki' ?
                reportService.printHelsinkiReport(project)
                :
                reportService.printReport(project)
            }
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button
            variant='contained'
            onClick={() => copyReportElementText()}>Copy to clipboard</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportDialogButton;
