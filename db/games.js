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


module.exports = {
    create,
    listGames
}