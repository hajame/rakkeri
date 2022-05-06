import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';

import Tracking from './Tracking';
import trackingService from '../services/trackings';
import Divider from '@mui/material/Divider';

const TrackingList = ({ trackingsByDate, updateTracking, tasks }) => {
  return (
    <Box>
      {
        Object.entries(trackingsByDate).sort(([aDate, aTrackings], [bDate, bTrackings]) => {
          return new Date(bTrackings[0].startTime) - new Date(aTrackings[0].startTime);
        }).map(([date, trackings]) => (
          <List
            key={date}
            dense={true}
            subheader={
              <ListSubheader
                component='li'
                color='primary'
              >
                {`${date}, total ${trackingService.getTotalSeconds(trackings.filter(t => t.endTime))}`}
              </ListSubheader>
            }
          >
            <Divider variant='middle' component='li' />
            {
              trackings.map(tracking =>
                <Tracking key={tracking.id}
                          tracking={tracking}
                          updateTracking={updateTracking}
                          tasks={tasks}
                />,
              )
            }

          </List>
        ))
      }
    </Box>
  );
};

export default TrackingList;