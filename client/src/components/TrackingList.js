import List from '@mui/material/List';
import Tracking from './Tracking';

const TrackingList = ({ trackings, updateTracking }) => {
  return (
    <List>
      {trackings.map((tracking) => (
        <Tracking key={tracking.id} tracking={tracking} updateTracking={updateTracking} />
      ))}
    </List>
  );
};

export default TrackingList;