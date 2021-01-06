const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const shell = require('shelljs');

const initLoaders = app => {
  const origin
    = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'http://warrenbuffett-test500.site';

  app.use(cors({
    origin,
    credentials: true,
  }));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  cron.schedule('* * * * * * *', () => {
    try {
      console.log('scheduler running every hour..');
      shell.exec('node utils/destroyOldHitData.js');
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = initLoaders;
