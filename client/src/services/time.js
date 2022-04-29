function now() {
  return new Date().toISOString();
}

const toDoubleDigits = value => {
  return value > 9 ? value : '0' + value;
};

const toHHMM = (hours, minutes) => `${toDoubleDigits(hours)}:${toDoubleDigits(minutes)}`;

const getHHMM = timeString => {
  const date = new Date(timeString);
  return toHHMM(date.getHours(), date.getMinutes());
};

const toDDMMYY = timeString => {
  if (!timeString) {
    return '';
  }
  const date = new Date(timeString);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear().toString()}`;
};

const getTime = (start, end) => {
  if (!start) {
    return '';
  }
  let startDate = new Date(start);
  let endDate = end ? new Date(end) : new Date();
  const differenceInMinutes = (endDate - startDate) / 1000 / 60;
  const hours = parseInt(differenceInMinutes / 60);
  const minutes = parseInt(differenceInMinutes % 60);
  return toHHMM(hours, minutes);
};

export default { now, toDoubleDigits, toHHMM, getHHMM, toDDMMYY, getTime };
