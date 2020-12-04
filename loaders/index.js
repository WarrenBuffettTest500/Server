const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const initLoaders = app => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = initLoaders;
