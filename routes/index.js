const express = require('express');
const router = express.Router();
const PATHS = require('../constants/paths');
const authController = require('../controllers/authControllers');

router.post(PATHS.LOGIN, authController.loginUser);
router.post(PATHS.SIGNUP, authController.registerUser);

module.exports = router;
