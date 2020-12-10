const express = require('express');
const router = express.Router();
const { findStockDetails } = require('../controllers/stockDetail.controllers');
const PATHS = require('../constants/paths');

router.get(`${PATHS.KEYWORD}${PATHS.INTERVAL}`, findStockDetails);

module.exports = router;
