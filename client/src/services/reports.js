import time from './time';

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
    println('| ' + time.HHMMFromSeconds(seconds) + ' | ' + task.name + ' |');
  });
  return totalSeconds;
}

function printTaskTotalsWithDateAndGetTotalSeconds(tasks, trackings) {
  let totalSeconds = 0;
  print('| ' + trackings[0].startTime.substring(0, 10) + ' ');
  const seconds = getSecondsForTask(trackings, tasks[0]);
  totalSeconds += seconds;
  println('| ' + time.HHMMFromSeconds(seconds) + ' | ' + tasks[0].name + ' |');
  tasks.shift();
  tasks.forEach(task => {
    const seconds = getSecondsForTask(trackings, task);
    totalSeconds += seconds;
    println('|            | ' + time.HHMMFromSeconds(seconds) + ' | ' + task.name + ' |');
  });
  return totalSeconds;
}

const printReport = (project) => {
  output = '';
  println('# Times by task in project: ' + project.name);
  println('');
  println('| hh:mm | Task |');
  println('| ----- | ---- |');
  let totalSeconds = printTaskTotalsAndGetTotalSeconds(project.tasks, project.trackings);
  println('| TOTAL | ' + time.HHMMFromSeconds(totalSeconds) + ' |');
  return output;
};

const printHelsinkiReport = (project) => {
  output = '';
  println('# Daily times by task in project: ' + project.name);
  println('');
  println('| Date       | hh:mm | Task |');
  println('| ---------- | ----- | ---- |');
  let totalSeconds = 0;
  const trackingsByDate = project.trackings.reduce((trackings, tracking) => {
    const year = tracking.startTime.substring(0, 10);
    trackings[year] = trackings[year] || [];
    trackings[year].push(tracking);
    return trackings;
  }, {});
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

  println('| TOTAL      | ' + time.HHMMFromSeconds(totalSeconds) + ' |' + '      |');
  return output;
};

export default { printReport, printHelsinkiReport };