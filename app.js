const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const initLoader = require('./loaders');
const connectSequelize = require('./config/db');

dotenv.config();
initLoader(app);
connectSequelize();

const PATHS = require('./constants/paths');
const RESPONSE = require('./constants/response');

const index = require('./routes/index');
const users = require('./routes/users');

app.use(PATHS.ROOT, index);
app.use(PATHS.USERS, users);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error(err);

  err.status
    ? res.status(err.status).json({ result: err.message })
    : res.status(500).json({ result: RESPONSE.INTERNAL_SEVER_ERROR });
});

module.exports = app;
