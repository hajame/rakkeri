const Tracking = ({ tracking }) => {

  function toHHMM(timeString) {
    const date = new Date(timeString);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <p>{tracking.task.name} : {tracking.user.username} :
      {toHHMM(tracking.startTime)} - {toHHMM(tracking.endTime)}</p>
  );

};

export default Tracking;
