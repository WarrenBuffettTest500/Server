const express = require('express');
const router = express.Router();
const { recommendationSymbolList, getAllByAttribute, getRandomCompanies } = require('../controllers/companyProfile.controller');
const PATHS = require('../constants/paths');

router.get(`${PATHS.RECOMMENDATION_STOCK_LIST}${PATHS.KEYWORD}`, recommendationSymbolList);
router.get(PATHS.ATTRIBUTE, getAllByAttribute);
router.get('/random', getRandomCompanies);
module.exports = router;
