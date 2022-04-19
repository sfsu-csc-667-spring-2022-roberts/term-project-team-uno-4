var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { result } = require('../db');
const Games = require('../db/games');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  // If user is already logged in, redirects to lobby page.
  if(req.isAuthenticated()) {
    res.redirect('/lobby');
    res.render('lobby', {
      name: req.user.username
    });
  } 
  else {
    res.render('index');
  }
});

router.get('/rules', function(req, res, next) {
  res.render('rules');
});

router.get('/lobby', ensureAuthenticated, function(req, res, next) {
  Games.listGames()
  .then((results) => console.log(results))
  .catch(console.log);

  res.render('lobby', {
    name: req.user.username
  });
});

router.get('/user', function(req, res) {
  res.send(req.user);
})

<<<<<<< HEAD
router.get('/rules', (req, res) => {
  res.render('rules')
})
=======
>>>>>>> UNORemote/master

module.exports = router;
