const express = require('express');
const router = express.Router();
const { recommendationSymbolList, getAllByAttribute } = require('../controllers/companyProfile.controller');
const PATHS = require('../constants/paths');

router.get(`${PATHS.RECOMMENDATION_STOCK_LIST}${PATHS.KEYWORD}`, recommendationSymbolList);
router.get(PATHS.SYMBOL, getAllByAttribute);

module.exports = router;
