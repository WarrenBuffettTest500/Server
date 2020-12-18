const express = require('express');
const router = express.Router();
const PATHS = require('../constants/paths');
const { createHit, getTrendingStocks } = require('../controllers/hit.controller');

router.post(PATHS.SYMBOL, createHit);
router.get(PATHS.TRENDING, getTrendingStocks);

module.exports = router;
