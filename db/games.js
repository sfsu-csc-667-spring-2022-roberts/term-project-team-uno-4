const db = require('../db');
var format = require('pg-format'); // To SQL insert nested array of array values with one query

// Constants
const MIN_PLAYERS = 2; // OPTIONAL: Game can start with just 2 or 3 players?
const MAX_PLAYERS = 4; // Game starts only with max players (aka 4).

// SQL statement presets:
const CREATE_GAME = 'INSERT INTO games (host_id, title, created) VALUES ($1, $2, $3) RETURNING id;';
const LIST_OF_GAMES = 'SELECT * FROM games;';
const INSERT_USER_INTO_GAME = 'INSERT INTO players (game_id, user_id, current_player, "order") VALUES (${game_id}, ${user_id}, ${current_player}, ${order}) RETURNING game_id AS id;'
const GET_PLAYERS_IN_GAME = 'SELECT * FROM players WHERE game_id=${game_id};';
const NUM_PLAYERS_IN_GAME = 'SELECT COUNT(*) FROM players WHERE game_id=${game_id};';

const GET_ALL_CARDS_IN_GAME = 'SELECT * from gameCards WHERE game_id=${game_id};';
const UPDATE_CARDS_NEW_PLAYER = 'UPDATE gameCards SET user_id=${user_id}, draw_pile=0 WHERE game_id=${game_id} AND "order"=${order} RETURNING game_id AS id;';
// Sets up a valid default game state when a game is created.
// Could add number of users we want per game (i.e. 4 players)
const create = (hostId, title) =>
    // Inserts new game into game table
    db.one(CREATE_GAME, [hostId, title, "now()"])
        .then(({ id }) =>
            // Inserts user who created the new game into players table
            db.one(INSERT_USER_INTO_GAME, { game_id: id, user_id: hostId, current_player: 1, order: 1 })
        )


const listGames = () => {
    return db.any(LIST_OF_GAMES);
}

const userListByGame = (game_id) =>
    db.any(GET_PLAYERS_IN_GAME,
        { game_id }
    );

const userCount = (game_id) =>
    db.one(NUM_PLAYERS_IN_GAME,
        { game_id }
    );

const join = (user_id, game_id) =>
    userCount(game_id)
        .then(({ count }) => {
            console.log(count)
            // Check if user has already joined
            return db.any(GET_PLAYERS_IN_GAME, { game_id })
                .then((results) => {
                    console.log("Joining game...");
                    let playerExists = false;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].user_id == user_id) {
                            playerExists = true;
                        }
                    }
                    if (!playerExists) {
                        // If Game isn't full (less than MAX_PLAYERS (4) players), insert player trying to join into the game.
                        if ({ count }.count < MAX_PLAYERS) {
                            // New player is inserted into the game.
                            return newPlayer(user_id, game_id, count);
                        }
                        else {
                            // Game is full, user can't join this game.
                            console.log("Game is currently full. Join canceled.");
                            return { id: -1 };
                        }
                    } else {
                        // User has already joined the game.
                        console.log("Already joined the game.");
                        return { id: results[0].game_id };
                    }
                }).catch((err) => {
                    console.log(err)
                })
        });

const newPlayer = (user_id, game_id, count) =>
    db.one(INSERT_USER_INTO_GAME, { game_id, user_id, current_player: 0, order: parseInt(count) + 1 })
        .then(({ id }) => {
            return Promise.all([{ id }, db.any(GET_ALL_CARDS_IN_GAME, { game_id: id })]);
        })
        .then(([{ id }, game_cards]) => {
            let cards = game_cards;
            let newCards = [];
            let count = 0;
            // cards.length - 8 to avoid colored Wild cards in new player's deck.
            for (var i = 0; i < cards.length - 8; i++) {
                if (cards[i].draw_pile == 1 && cards[i].discarded == 0 && count < 7) {
                    cards[i].user_id = user_id;
                    newCards.push({
                        user_id: cards[i].user_id,
                        game_id: id,
                        card_id: cards[i].card_id,
                        order: cards[i].order,
                        draw_pile: 0
                    });
                    count++;
                }
            }
            return Promise.all([
                { id },
                ...newCards.map((card) => db.any(UPDATE_CARDS_NEW_PLAYER, { user_id, game_id: id, order: card.order }))
            ]);
        })
        .then(([{ id }]) => ({ id }));

module.exports = {
    create,
    listGames,
    join, 
    userListByGame
}