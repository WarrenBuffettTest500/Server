const express = require('express');
const router = express.Router();
const { recommendationSymbolList, updateViews, getRandomCompaines } = require('../controllers/companyProfile.controller');
const PATHS = require('../constants/paths');

router.get(`${PATHS.RECOMMENDATION_STOCK_LIST}${PATHS.KEYWORD}`, recommendationSymbolList);
router.put(`${PATHS.KEYWORD}${PATHS.VIEWS}`, updateViews);
router.get('/random', getRandomCompaines);
module.exports = router;
