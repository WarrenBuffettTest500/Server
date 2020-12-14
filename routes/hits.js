const express = require('express');
const router = express.Router();
const PATHS = require('../constants/paths');
const { createHit, getTrendingStocks } = require('../controllers/hit.controller');

router.post('/:symbol', createHit);
router.get('/trending', getTrendingStocks);

module.exports = router;
