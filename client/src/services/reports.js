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
    .reduce(getSum, 0);
}

function printTaskTotalsAndGetTotalSeconds(tasks, trackings) {
  let totalSeconds = 0;
  tasks.forEach(task => {
    const seconds = getSecondsForTask(trackings, task);
    totalSeconds += seconds;
    println('|  ' + time.HHMMFromSeconds(seconds) + ' | ' + task.name + ' |');
  });
  return totalSeconds;
}

function printTaskTotalsWithDateAndGetTotalSeconds(tasks, trackings) {
  let totalSeconds = 0;
  print('| ' + trackings[0].startTime.substring(0, 10) + ' ');
  const seconds = getSecondsForTask(trackings, tasks[0]);
  totalSeconds += seconds;
  const secondsHHMM = time.HHMMFromSeconds(seconds);
  println('| ' + getLeftPadding(secondsHHMM) + secondsHHMM + ' | ' + tasks[0].name + ' |');
  tasks.shift();
  tasks.forEach(task => {
    const seconds = getSecondsForTask(trackings, task);
    const secondsHHMM = time.HHMMFromSeconds(seconds);
    totalSeconds += seconds;
    println('|            | ' + getLeftPadding(secondsHHMM) + secondsHHMM + ' | ' + task.name + ' |');
  });
  return totalSeconds;
}

function getLeftPadding(HHMM) {
  return HHMM.length < 6 ? ' ' : '';
}

const getTimesByTaskReport = (project) => {
  output = '';
  println('# Times by task in project: ' + project.name);
  println('');
  println('|  hh:mm | Task   |');
  println('| -----: | :----- |');
  let totalSeconds = printTaskTotalsAndGetTotalSeconds(project.tasks, project.trackings);
  const totalHHMM = time.HHMMFromSeconds(totalSeconds);
  println('| ' + getLeftPadding(totalHHMM) + totalHHMM + ' | TOTAL  |');
  return output;
};

const getHelsinkiReport = (project) => {
  output = '';
  println('# Daily times by task in project: ' + project.name);
  println('');
  println('|    Date    |  hh:mm | Task  |');
  println('| :--------: | -----: | :---- |');
  let totalSeconds = 0;
  const trackingsByDate = trackingService.getTrackingsByDate(project.trackings);
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
  const totalHHMM = time.HHMMFromSeconds(totalSeconds);
  println('|   TOTAL    | ' + getLeftPadding(totalHHMM) + totalHHMM + ' |' + '      |');
  return output;
};

export default { getTimesByTaskReport, getHelsinkiReport };