/* eslint-disable new-cap */
/* eslint-disable no-throw-literal */

/**
 * Module dependencies.
 */

const Task = require('../models/Task.js');
const Query = require('./query');
const Label = require('../models/Label.js');
const logger = require('../../logger');
const moment = require('moment');

async function getLabels(req) {
  try {
    const labels = await Query.get(Label, { userId: req.user._id });
    if (!labels) {
      throw 'Label not found';
    }
    return labels;
  } catch (err) {
    logger.error(err.stack);
  }
}
async function getTasks(req) {
  try {
    const tasks = await Query.get(Task, { userId: req.user._id, status: 'ACTIVE' });
    if (!tasks) {
      throw 'Tasks not found';
    }
    return tasks;
  } catch (err) {
    logger.error(err.stack);
  }
}
function getOverdueTasks(tasks) {
  const overdueTasks = [];
  const currentTime = moment()
    .utc()
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    .toString();
  tasks.forEach(function(task) {
    if (moment(task.reminder).isBefore(currentTime)) {
      overdueTasks.push(task);
    }
  });
  return overdueTasks;
}
function getTodaysTasks(tasks) {
  const todayTasks = [];
  const currentTime = moment()
    .utc()
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    .toString();
  const todayEnd = moment()
    .utc()
    .endOf('day')
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    .toString();
  tasks.forEach(function(task) {
    if (moment(task.reminder).isBetween(currentTime, todayEnd)) {
      todayTasks.push(task);
    }
  });
  return todayTasks;
}
function getTomorrowsTasks(tasks) {
  const tomorrowTasks = [];
  const tomorrowStart = moment()
    .utc()
    .add(1, 'days')
    .startOf('day')
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    .toString();
  const tomorrowEnd = moment()
    .utc()
    .add(1, 'days')
    .endOf('day')
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    .toString();
  tasks.forEach(function(task) {
    if (moment(task.reminder).isBetween(tomorrowStart, tomorrowEnd)) {
      tomorrowTasks.push(task);
    }
  });
  return tomorrowTasks;
}
function getOvermorrowsTasks(tasks) {
  const overmorrowTasks = [];
  const overmorrowStart = moment()
    .utc()
    .add(2, 'days')
    .startOf('day')
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    .toString();
  const overmorrowEnd = moment()
    .utc()
    .add(2, 'days')
    .endOf('day')
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    .toString();
  tasks.forEach(function(task) {
    if (moment(task.reminder).isBetween(overmorrowStart, overmorrowEnd)) {
      overmorrowTasks.push(task);
    }
  });
  return overmorrowTasks;
}

module.exports = async function dashboard(req) {
  const response = {};
  const tasks = await getTasks(req);
  response.labels = await getLabels(req);
  response.overdue = getOverdueTasks(tasks);
  response.today = getTodaysTasks(tasks);
  response.tomorrow = getTomorrowsTasks(tasks);
  response.overmorrow = getOvermorrowsTasks(tasks);

  return response;
};
