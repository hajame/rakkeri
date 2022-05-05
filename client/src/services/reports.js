import time from './time';
import trackingService from './trackings';

let output = '';

const getSum = (total, tracking) => {
  return total + time.getDurationInSeconds(tracking.startTime, tracking.endTime);
};

function println(string) {
  output = output + string + '\n';
}

function print(string) {
  output = output + string;
}

function getSecondsForTask(trackings, task) {
  return trackings
    .filter(t => t.task.id === task.id)
    .filter(t => t.endTime !== null)
    .reduce(getSum, 0);
}

function printTaskTotalsAndGetTotalSeconds(tasks, trackings) {
  let totalSeconds = 0;
  tasks.forEach(task => {
    const seconds = getSecondsForTask(trackings, task);
    if (seconds === 0) {
      return;
    }
    totalSeconds += seconds;
    println('|  ' + time.HHMMSSFromSeconds(seconds) + ' | ' + task.name + ' |');
  });
  return totalSeconds;
}

function printTaskTotalsWithDateAndGetTotalSeconds(tasks, trackings) {
  let totalSeconds = 0;
  print('| ' + trackings[0].startTime.substring(0, 10) + ' ');
  const seconds = getSecondsForTask(trackings, tasks[0]);
  totalSeconds += seconds;
  const secondsHHMMSS = time.HHMMSSFromSeconds(seconds);
  println('| ' + getLeftPadding(secondsHHMMSS) + secondsHHMMSS + ' | ' + tasks[0].name + ' |');
  tasks.shift();
  tasks.forEach(task => {
    const seconds = getSecondsForTask(trackings, task);
    const secondsHHMMSS = time.HHMMSSFromSeconds(seconds);
    totalSeconds += seconds;
    println('|            | ' + getLeftPadding(secondsHHMMSS) + secondsHHMMSS + ' | ' + task.name + ' |');
  });
  return totalSeconds;
}

function getLeftPadding(HHMM) {
  return HHMM.length < 9 ? ' ' : '';
}

const getFinishedTrackings = trackings => trackings.filter(t => t.endTime != null);

const getTimesByTaskReport = (project) => {
  output = '';
  println('# Times by task in project: ' + project.name);
  println('');
  println('|  hh:mm:ss | Task   |');
  println('| --------: | :----- |');
  const finishedTrackings = getFinishedTrackings(project.trackings);
  let totalSeconds = printTaskTotalsAndGetTotalSeconds(project.tasks, finishedTrackings);
  const totalHHMMSS = time.HHMMSSFromSeconds(totalSeconds);
  println('| ' + getLeftPadding(totalHHMMSS) + totalHHMMSS + ' | TOTAL  |');
  return output;
};


const getHelsinkiReport = (project) => {
  output = '';
  println('# Daily times by task in project: ' + project.name);
  println('');
  println('|    Date    |  hh:mm:ss | Task  |');
  println('| :--------: | --------: | :---- |');
  let totalSeconds = 0;
  const finishedTrackings = getFinishedTrackings(project.trackings);
  const trackingsByDate = trackingService.getTrackingsByDate(finishedTrackings);

  for (const date in trackingsByDate) {
    let taskIds = new Set();
    let uniqueTasks = [];
    trackingsByDate[date].forEach(t => {
      if (!taskIds.has(t.task.id)) {
        taskIds.add(t.task.id);
        uniqueTasks.push(t.task);
      }
    });
    totalSeconds += printTaskTotalsWithDateAndGetTotalSeconds(uniqueTasks, trackingsByDate[date]);
  }
  const totalHHMMSS = time.HHMMSSFromSeconds(totalSeconds);
  println('|   TOTAL    | ' + getLeftPadding(totalHHMMSS) + totalHHMMSS + ' |' + '      |');
  return output;
};

export default { getTimesByTaskReport, getHelsinkiReport };