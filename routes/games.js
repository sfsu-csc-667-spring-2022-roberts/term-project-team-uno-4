const express = require('express');
const router = express.Router();
const Games = require('../db/games');
const Cards = require('../db/cards');
const Users = require('../db/users');
const { ensureAuthenticated } = require('../config/auth');

