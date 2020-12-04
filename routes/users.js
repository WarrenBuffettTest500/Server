const express = require('express');
const router = express.Router();
const PATHS = require('../constants/paths');

router.get(PATHS.ROOT, (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
