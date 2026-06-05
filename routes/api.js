const express = require('express');
const router = express.Router();

router.get('/status', function (_req, res) {
  res.status(200).json({ status: 'UP' });
});

module.exports = router;
