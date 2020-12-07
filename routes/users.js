const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/user.controller');
const { getPreferenceInfo, createPreferenceInfo, updatePreferenceInfo } = require('../controllers/preferenceInfo.controller');
const { createStockData, getPortfolio } = require('../controllers/stockData.controller');

router.get('/current_user', getCurrentUser);
router.put('/:user_id', updateUserInfo);
router.get('/:user_id/preference_infos/:preference_info_id', getPreferenceInfo);
router.post('/:user_id/preference_infos', createPreferenceInfo);
router.put('/:user_id/preference_infos', updatePreferenceInfo);
router.post('/:user_id/stock_data', createStockData);
router.get('/:user_id/portfolio', getPortfolio);

module.exports = router;
