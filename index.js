// Your code here
function createEmployeeRecord(arr) {
  let employeeObj = {};
  employeeObj.firstName = arr[0];
  employeeObj.familyName = arr[1];
  employeeObj.title = arr[2];
  employeeObj.payPerHour = arr[3];
  employeeObj.timeInEvents = [];
  employeeObj.timeOutEvents = [];
  return employeeObj;
}

function createEmployeeRecords(arr) {
  return arr.map(createEmployeeRecord);
}

function createTimeInEvent(empObj, dateStr) {
  empObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStr.split(" ")[1].slice(0, 2) + "00"),
    date: dateStr.split(" ")[0],
  });
  return empObj;
}
function createTimeOutEvent(empObj, dateStr) {
  empObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStr.split(" ")[1].slice(0, 2) + "00"),
    date: dateStr.split(" ")[0],
  });
  return empObj;
}
function hoursWorkedOnDate(empObj, dateStr) {
  let timeInEvent = empObj.timeInEvents.find((event) => event.date === dateStr);
  let timeOutEvent = empObj.timeOutEvents.find(
    (event) => event.date === dateStr
  );

  if (timeInEvent && timeOutEvent) {
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  } else {
    return 0;
  }
}

function wagesEarnedOnDate(empObj, dateStr) {
  return parseInt(hoursWorkedOnDate(empObj, dateStr) * empObj.payPerHour);
}
function allWagesFor(empObj) {
  let totalWages = 0;
  for (let i = 0; i < empObj.timeInEvents.length; i++) {
    let date = empObj.timeInEvents[i].date;
    totalWages += wagesEarnedOnDate(empObj, date);
  }
  return totalWages;
}
function calculatePayroll(arr) {
  return arr.reduce(allWagesFor);
}
