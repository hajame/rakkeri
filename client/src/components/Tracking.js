const Tracking = ({ tracking }) => {

  const toDDMMYY = timeString => {
    if (!timeString) {
      return '';
    }
    const date = new Date(timeString);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear().toString()}`;
  };

  const toDoubleDigits = value => {
    return value > 9 ? value : '0' + value;
  };

  function getTime(start, end) {
    if (!start) {
      return '';
    }
    let startDate = new Date(start);
    let endDate = end ? new Date(end) : new Date();
    const differenceInMinutes = (endDate - startDate) / 1000 / 60;
    const hours = parseInt(differenceInMinutes / 60);
    const minutes = parseInt(differenceInMinutes % 60);
    return `${toDoubleDigits(hours)}:${toDoubleDigits(minutes)}`;
  }

  return (
    <p>{toDDMMYY(tracking.startTime)} [{getTime(tracking.startTime, tracking.endTime)}] {tracking.task.name}</p>
  );

};

export default Tracking;
