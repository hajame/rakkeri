import time from './time';

let output = '';

const getSum = (total, tracking) => {
  return total + time.getDurationInSeconds(tracking.startTime, tracking.endTime);
};

function println(string) {
  output = output + string + '\n';
}

const printReport = (project) => {
  output = '';
  println('# Times by task in project: ' + project.name + '\n\n');
  println('| Task | hh:mm |');
  println('| ---- | ----- |');
  let totalSeconds = 0;
  project.tasks.forEach(task => {
    const seconds = project.trackings
      .filter(t => t.task.id === task.id)
      .reduce(getSum, 0);
    totalSeconds += seconds;
    println('| ' + task.name + ' | ' + time.HHMMFromSeconds(seconds) + ' |');
  });
  println('| TOTAL | ' + time.HHMMFromSeconds(totalSeconds) + ' |');
  return output;
};

export default { printReport };