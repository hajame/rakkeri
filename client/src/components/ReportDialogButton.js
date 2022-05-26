import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import reportService from '../services/reports';

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
      <Button onClick={openDialog} variant='outlined' color={'secondary'} sx={{ mt: 0.5, mb: 0, marginRight: '12px' }}>
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
                reportService.getHelsinkiReport(project)
                :
                reportService.getTimesByTaskReport(project)
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
