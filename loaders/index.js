const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const shell = require('shelljs');

const initLoaders = app => {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  cron.schedule('*/3 * * * *', () => {
    console.log('scheduler running every 3 minutes..');
    shell.exec('node utils/destroyOldHitData.js');
  });
};

module.exports = initLoaders;
