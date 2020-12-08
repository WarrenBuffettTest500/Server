const express = require('express');
const router = express.Router();
const { findStockDetails } = require('../controllers/stockDetail.controllers');
const PATHS = require('../constants/paths');
const verifyToken = require('../middlewares/verifyToken');

router.get(PATHS.KEYWORD, verifyToken, findStockDetails);

module.exports = router;
