const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/user.controller');
const { getPreferenceInfo, createPreferenceInfo, updatePreferenceInfo } = require('../controllers/preferenceInfo.controller');
const { createPortfolioItem, deletePortfolioItem, updatePortfolioItem } = require('../controllers/portfolioItem.controller');
const { getPortfolio, getPortfolioRecommendationsByPreference, getPortfolioRecommendationsByPortfolio } = require('../controllers/portfolio.controller');
const verifyToken = require('../middlewares/verifyToken');
const PATHS = require('../constants/paths');

router.get('/current_user', verifyToken, getCurrentUser);
router.put('/:user_id', verifyToken, updateUserInfo);
router.get('/:user_id/preference_infos/:preference_info_id', verifyToken, getPreferenceInfo);
router.post('/:user_id/preference_infos', verifyToken, createPreferenceInfo);
router.put('/:user_id/preference_infos', verifyToken, updatePreferenceInfo);

router.get('/:user_id/portfolio', verifyToken, getPortfolio);
router.post('/:user_id/portfolio_items', verifyToken, createPortfolioItem);
router.put('/:user_id/portfolio_items/:portfolio_item_id', verifyToken, updatePortfolioItem);
router.delete('/:user_id/portfolio_items/:portfolio_item_id', verifyToken, deletePortfolioItem);

router.get('/:user_id/portfolios/recommendations/preference', verifyToken, getPortfolioRecommendationsByPreference);
router.get('/:user_id/portfolios/recommendations/portfolio', verifyToken, getPortfolioRecommendationsByPortfolio);

module.exports = router;
