const express = require('express');
const router = express.Router();
const Games = require('../db/games');
const Cards = require('../db/cards');
const Users = require('../db/users');
const { ensureAuthenticated } = require('../config/auth');

/* GAME BY URL (only for users part of the game) */
router.get("/:id", ensureAuthenticated, function (req, res, next) {

    const { id } = req.params; // Game_id
    let gameId = parseInt(id);

    Games.userListByGame(gameId)
    // .then((response) => response.json())
    .then((results) => {
        let inGame = false;
        for(let i = 0; i < results.length; i++) {
            if(results[i].user_id == req.user.id) {
                inGame = true;
            }
        }
        if(inGame) {
            res.render('game', { id: gameId, name: req.user.username });
        } else {
            res.redirect('../lobby');
            res.render('lobby', {
                name: req.user.username
            });
        }
    })
    .catch((err) => {
        console.log(err)
    })
});

router.post("/create", (req, res) => {
    const userId = req.user.id
    const lobbyTitle = req.body.title
    // console.log(userId, lobbyTitle)

    Games.create(userId, lobbyTitle)
    .then((id) => {
        // console.log(id)
        return id;
    })
    .then(({id}) => {
        res.redirect(`/games/${id}`);
        res.render('game', {id, name: req.user.username})
    }).catch((err) => {
        console.log(err)
    })
})

/* LISTS ALL GAMES FROM DATABASE */
router.post("/list", (req, res) => {
    Games.listGames()
    .then((results) => res.json(results))
    .catch(console.log);
});

module.exports = router;