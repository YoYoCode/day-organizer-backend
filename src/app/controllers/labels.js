/* eslint-disable new-cap */
/* eslint-disable no-throw-literal */

/**
 * Module dependencies.
 */
const _ = require('lodash');
const Label = require('../models/Label.js');
const Query = require('../helpers/query');
const Dashboard = require('../helpers/dashboard');
const labelRouter = require('express').Router();
const logger = require('../../logger');

/**
 * Create a label
 */
const createLabel = async (req, res) => {
  try {
    await Query.post(Label, { userId: req.user._id, ...req.body });
    const dashboardResponse = await Dashboard(req);
    if (!dashboardResponse) {
      throw 'Internal Server Error';
    }
    res.send(dashboardResponse);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

/**
 * Get label details
 */
const getLabel = async (req, res) => {
  try {
    const { id } = req.query;
    let labels;
    if (!id) {
      labels = await Query.get(Label, { userId: req.user._id });
    } else {
      labels = await Query.getOne(Label, { _id: id, userId: req.user._id });
    }
    if (!labels) {
      throw 'Label not found';
    }
    const dashboardResponse = await Dashboard(req);
    if (!dashboardResponse) {
      throw 'Internal Server Error';
    }
    res.send(dashboardResponse);
  } catch (err) {
    logger.error(err.stack);
    res.status(404).json(err);
  }
};

/**
 * Update label details
 */
const updateLabel = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw 'Invalid Label ID';
    }
    const label = await Query.update(Label, { _id: id, userId: req.user._id }, pick(req.body), { new: true });
    if (!label) {
      throw 'Label not found';
    }
    const dashboardResponse = await Dashboard(req);
    if (!dashboardResponse) {
      throw 'Internal Server Error';
    }
    res.send(dashboardResponse);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

/**
 * Delete label details
 * X - This API is not exposed
 */
const deleteLabel = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw 'Invalid Label ID';
    }
    const label = await Query.delete(Label, {
      _id: id,
      userId: req.user._id
    });
    if (!label) {
      throw 'Label not found';
    }
    const dashboardResponse = await Dashboard(req);
    if (!dashboardResponse) {
      throw 'Internal Server Error';
    }
    res.send(dashboardResponse);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

const pick = body => _.pick(body, ['name', 'colorCode']);

labelRouter.get('/', getLabel);
labelRouter.post('/', createLabel);
labelRouter.patch('/:id', updateLabel);
labelRouter.delete('/:id', deleteLabel);

module.exports = labelRouter;
