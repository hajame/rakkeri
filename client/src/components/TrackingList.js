import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';

import Tracking from './Tracking';
import trackingService from '../services/trackings';
import Divider from '@mui/material/Divider';

const TrackingList = ({ trackingsByDate, updateTracking }) => {
  return (
    <Box>
      {
        Object.entries(trackingsByDate).sort(([aDate, aTrackings], [bDate, bTrackings]) => {
          return new Date(bTrackings[0].startTime) - new Date(aTrackings[0].startTime);
        }).map(([date, trackings]) => (
          <List
            key={date}
            subheader={
              <ListSubheader
                component='li'
              >
                {`${date}, day total ${trackingService.getTotalSeconds(trackings)}`}
              </ListSubheader>
            }
          >
            <Divider variant='middle' component='li' />
            {
              trackings.map(tracking =>
                <Tracking key={tracking.id} tracking={tracking} updateTracking={updateTracking} />,
              )
            }

          </List>
        ))
      }
    </Box>
  );
};

export default TrackingList;