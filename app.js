const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const app = express();
const initLoader = require('./loaders');
const connectSequelize = require('./config/db');
const cookieParser = require('cookie-parser');

initLoader(app);
connectSequelize();

const PATHS = require('./constants/paths');
const RESPONSE = require('./constants/responses');

const index = require('./routes/index');
const users = require('./routes/users');
const stockDetails = require('./routes/stockDetails');
const companyProfiles = require('./routes/companyProfiles');
const hits = require('./routes/hits');

app.use(cookieParser());

app.use(function(req, res, next) {
  console.log(req.path, req.params, req.body);
  next();
});

app.use(PATHS.USERS, users);
app.use(PATHS.STOCK_DETAILS, stockDetails);
app.use(PATHS.COMPANY_PROFILES, companyProfiles);
app.use(PATHS.HITS, hits);
app.use(PATHS.ROOT, index);

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
