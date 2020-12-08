const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/user.controller');
const { getPreferenceInfo, createPreferenceInfo, updatePreferenceInfo } = require('../controllers/preferenceInfo.controller');
const { createPortfolioItem, getPortfolio, deletePortfolioItem, updatePortfolioItem } = require('../controllers/stockData.controller');

router.get('/current_user', getCurrentUser);
router.put('/:user_id', updateUserInfo);
router.get('/:user_id/preference_infos/:preference_info_id', getPreferenceInfo);
router.post('/:user_id/preference_infos', createPreferenceInfo);
router.put('/:user_id/preference_infos', updatePreferenceInfo);

router.get('/:user_id/portfolio', getPortfolio);
router.post('/:user_id/portfolio_items', createPortfolioItem);
router.put('/:user_id/portfolio_items/:portfolio_item_id', updatePortfolioItem);
router.delete('/:user_id/portfolio_items/:portfolio_item_id', deletePortfolioItem);

module.exports = router;
