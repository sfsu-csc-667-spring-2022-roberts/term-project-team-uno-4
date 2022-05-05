const express = require('express');
const router = express.Router();
const Games = require('../db/games');
const Cards = require('../db/cards');
const Users = require('../db/users');
const { ensureAuthenticated } = require('../config/auth');

router.post("/create", (req, res) => {
    const userId = req.user.id
    const lobbyTitle = req.body.title
    console.log(userId, lobbyTitle)

    Games.create(userId, lobbyTitle)
    .then((id) => {
        console.log(id)
    })
})

/* LISTS ALL GAMES FROM DATABASE */
router.post("/list", (req, res) => {
    Games.listGames()
    .then((results) => res.json(results))
    .catch(console.log);
});

module.exports = router;