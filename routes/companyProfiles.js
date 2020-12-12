const express = require('express');
const router = express.Router();
const { recommendationSymbolList, updateViews, getCompanyRecommendations, getAllByAttribute } = require('../controllers/companyProfile.controller');
const PATHS = require('../constants/paths');

router.get(`${PATHS.RECOMMENDATION_STOCK_LIST}${PATHS.KEYWORD}`, recommendationSymbolList);
router.put(`${PATHS.KEYWORD}${PATHS.VIEWS}`, updateViews);
router.get(PATHS.ATTRIBUTE, getAllByAttribute);
router.get('/random', getCompanyRecommendations);
module.exports = router;
