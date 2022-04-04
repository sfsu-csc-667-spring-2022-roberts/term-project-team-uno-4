const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'UNO Game - CSC 667' });
});
router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/game', (req, res) => {
  res.render('game')
})

router.get('/lobby', (req, res) => {
  res.render('lobby')
})

module.exports = router;
