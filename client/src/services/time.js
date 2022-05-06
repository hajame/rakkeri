function now() {
  return new Date().toISOString();
}

const doubleDigits = value => {
  return value > 9 ? value : '0' + value;
};

const toHHMM = (hours, minutes) => `${doubleDigits(hours)}:${doubleDigits(minutes)}`;

const toHHMMSS = (hours, minutes, seconds) => {
  return `${doubleDigits(hours)}:${doubleDigits(minutes)}:${doubleDigits(seconds)}`;
};


const getHHMM = timeString => {
  const date = new Date(timeString);
  return toHHMM(date.getHours(), date.getMinutes());
};

const toDDMMYY = timeString => {
  if (!timeString) {
    return '';
  }
  const date = new Date(timeString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString()}`;
};

const toYYYYMMDD = timeString => {
  if (!timeString) {
    return '';
  }
  const date = new Date(timeString);
  return `${date.getFullYear().toString()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const getDurationInSeconds = (start, end) => {
  if (!start) {
    return '';
  }
  let startDate = new Date(start);
  let endDate = end ? new Date(end) : new Date();
  return parseInt((endDate - startDate) / 1000);
};

const HHMMFromSeconds = seconds => {
  const hours = parseInt(seconds / 60 / 60);
  const minutes = parseInt((seconds / 60) % 60);
  return toHHMM(hours, minutes);
};

const HHMMSSFromSeconds = seconds => {
  const hours = parseInt(seconds / 60 / 60);
  const minutes = parseInt((seconds / 60) % 60);
  const remainderSeconds = parseInt(seconds % 60);
  return toHHMMSS(hours, minutes, remainderSeconds);
};

const getDuration = (start, end) => {
  if (!start) {
    return '';
  }
  let startDate = new Date(start);
  let endDate = end ? new Date(end) : new Date();
  const differenceInMinutes = (endDate - startDate) / 60000;
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


export default {
  now,
  toDoubleDigits: doubleDigits,
  toHHMM,
  getHHMM,
  toDDMMYY,
  toYYYYMMDD,
  getDuration,
  setHHMM,
  validateHHMM,
  getDurationInSeconds,
  HHMMFromSeconds,
  HHMMSSFromSeconds,
};
