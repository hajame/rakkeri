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

const getDuration = (start, end) => {
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

const setHHMM = (date, HHMM) => {
  date.setHours(parseInt(HHMM.substring(0, 2)));
  date.setMinutes(parseInt(HHMM.substring(3, 5)));
};

const validateHHMM = (HHMM) => {
  if (HHMM.length !== 5) {
    return false;
  }
  if (HHMM[2] !== ':') {
    return false;
  }
  try {
    const HH = parseInt(HHMM.substring(0, 2));
    const MM = parseInt(HHMM.substring(3, 5));
    const isGoodHH = HH >= 0 && HH < 24;
    const isGoodMM = MM >= 0 && MM < 60;
    return isGoodHH && isGoodMM;
  } catch {
    return false;
  }
};

export default { now, toDoubleDigits, toHHMM, getHHMM, toDDMMYY, getDuration, setHHMM, validateHHMM };
