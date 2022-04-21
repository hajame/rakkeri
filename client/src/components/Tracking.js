const Tracking = ({ tracking }) => {

  return (
    <p>{tracking.task.name} : {tracking.user.username} : {tracking.startTime} - {tracking.endTime}</p>
  );

};

export default Tracking;
