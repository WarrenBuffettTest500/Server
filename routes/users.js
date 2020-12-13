const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/user.controller');
const { getPreferenceInfo, createPreferenceInfo, updatePreferenceInfo } = require('../controllers/preferenceInfo.controller');
const { createPortfolioItem, deletePortfolioItem, updatePortfolioItem } = require('../controllers/portfolioItem.controller');
const { getPortfolio, getPortfolioRecommendationsByPreference, getPortfolioRecommendationsByPortfolio } = require('../controllers/portfolio.controller');
const { getRandomCompaines } = require('../controllers/companyProfile.controller');

router.get('/current_user', getCurrentUser);
router.put('/:user_id', updateUserInfo);
router.get('/:user_id/preference_infos/:preference_info_id', getPreferenceInfo);
router.post('/:user_id/preference_infos', createPreferenceInfo);
router.put('/:user_id/preference_infos', updatePreferenceInfo);

router.get('/:user_id/portfolio', getPortfolio);
router.post('/:user_id/portfolio_items', createPortfolioItem);
router.put('/:user_id/portfolio_items/:portfolio_item_id', updatePortfolioItem);
router.delete('/:user_id/portfolio_items/:portfolio_item_id', deletePortfolioItem);

router.get('/:user_id/portfolios/recommendations/preference', getPortfolioRecommendationsByPreference);
router.get('/:user_id/portfolios/recommendations/portfolio', getPortfolioRecommendationsByPortfolio);
router.get('/:user_id/companies/recommendations', getRandomCompaines);

module.exports = router;
