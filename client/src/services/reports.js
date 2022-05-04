import time from './time';

let output = '';

const getSum = (total, tracking) => {
  return total + time.getDurationInSeconds(tracking.startTime, tracking.endTime);
};

function println(string) {
  output = output + string + '\n';
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
    println('| ' + task.name + ' | ' + time.HHMMFromSeconds(seconds) + ' |');
  });
  return totalSeconds;
}

const printReport = (project) => {
  output = '';
  println('# Times by task in project: ' + project.name);
  println('');
  println('| Task | hh:mm |');
  println('| ---- | ----- |');
  let totalSeconds = printTaskTotalsAndGetTotalSeconds(project.tasks, project.trackings);
  println('| TOTAL | ' + time.HHMMFromSeconds(totalSeconds) + ' |');
  return output;
};

const printHelsinkiReport = (project) => {
  output = '';
  println('# Daily times by task in project: ' + project.name);
  println('');
  println('| Task | hh:mm |');
  println('| ---- | ----- |');
  let totalSeconds = 0;
  console.log(project.trackings);
  project.trackings.groupBy(({ startTime }) => startTime);
  //   .forEach(group => {
  //   console.log(group);
  // });

  // project.tasks.forEach(task => {
  //   const seconds = getSecondsForTask(project.trackings, task);
  //   totalSeconds += seconds;
  //   println('| ' + task.name + ' | ' + time.HHMMFromSeconds(seconds) + ' |');
  // });
  println('| TOTAL | ' + time.HHMMFromSeconds(totalSeconds) + ' |');
  return output;
};

export default { printReport, printHelsinkiReport };