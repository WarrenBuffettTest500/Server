const express = require('express');
const router = express.Router();

router.get('/:keyword', (req, res, next) => {
  console.log(req.params, 'req.params');
});

module.exports = router;
