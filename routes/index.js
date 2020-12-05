const express = require('express');
const router = express.Router();
const PATHS = require('../constants/paths');
const { generateToken, registerUser } = require('../controllers/auth.controllers');

router.post(PATHS.LOGIN, generateToken);
router.post(PATHS.SIGNUP, registerUser);

module.exports = router;
