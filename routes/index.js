const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'UNO Game - CSC 667' });
});

module.exports = router;
