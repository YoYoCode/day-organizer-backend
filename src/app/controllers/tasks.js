/* eslint-disable new-cap */
/* eslint-disable no-throw-literal */

/**
 * Module dependencies.
 */
const _ = require('lodash');
const Task = require('../models/Task.js');
const Query = require('../helpers/query');
const taskRouter = require('express').Router();
const logger = require('../../logger');

const statuses = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
  COMPLETED: 'COMPLETED'
};

const priorities = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};
/**
 * Create a task
 */
const createTask = async (req, res) => {
  try {
    const task = await Query.post(Task, { userId: req.user._id, ...req.body });
    res.send(task);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

function getWhereClause(query) {
  const { status = statuses.ACTIVE, priority } = query;
  if (!_.values(statuses).includes(status)) {
    throw 'Invalid Status';
  }

  if (priority && !_.values(priorities).includes(priority)) {
    throw 'Invalid Priority';
  }

  const cleanObject = _.pickBy(query, value => !_.isUndefined(value));

  return { ...cleanObject, ...{ status } };
}

/**
 * Get tasks details
 */
const getTasks = async (req, res) => {
  try {
    const whereClause = getWhereClause(req.query);
    const tasks = await Query.get(Task, { userId: req.user._id, ...whereClause });
    if (!tasks) {
      throw 'Tasks not found';
    }
    res.send(tasks);
  } catch (err) {
    logger.error(err.stack);
    res.status(404).json(err);
  }
};

/**
 * Update task details
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw 'Invalid Task ID';
    }
    const task = await Query.update(Task, { _id: id, userId: req.user._id }, pick(req.body), { new: true });
    if (!task) {
      throw 'Task not found';
    }
    res.send(task);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

/**
 * Delete task details
 * X - This API is not exposed
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw 'Invalid Task ID';
    }
    const task = await Query.delete(Task, { _id: id, userId: req.user._id });
    if (!task) {
      throw 'Task not found';
    }
    res.send(task);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

const pick = body => _.pick(body, ['name', 'status', 'label', 'priority', 'reminder']);

taskRouter.get('/', getTasks);
taskRouter.post('/', createTask);
taskRouter.patch('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

module.exports = taskRouter;
