var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

module.exports = router;
