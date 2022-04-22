const Tracking = ({ tracking }) => {

  function toHHMM(timeString) {
    if (!timeString) {
      return '';
    }
    const date = new Date(timeString);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear().toString().slice(2, 4)} ${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <p>Task: {tracking.task.name}, User: {tracking.user.username}, <br />
      {toHHMM(tracking.startTime)} - {toHHMM(tracking.endTime)}</p>
  );

};

export default Tracking;
