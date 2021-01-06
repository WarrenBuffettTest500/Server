const express = require('express');
const router = express.Router();
const PATHS = require('../constants/paths');
const { generateToken, registerUser } = require('../controllers/auth.controllers');
const { getRandomPortfolios } = require('../controllers/portfolio.controller');

router.get('/', (req, res) => {
  res.send('deployed');
});
router.post(PATHS.LOGIN, generateToken);
router.post(PATHS.SIGNUP, registerUser);
router.get(`${PATHS.PORTFOLIOS}${PATHS.RANDOM}`, getRandomPortfolios);

module.exports = router;
