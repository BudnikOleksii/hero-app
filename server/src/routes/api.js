const express = require('express');

const heroesRouter = require('./heroes/heroes.router');

const api = express.Router();

api.use('/heroes', heroesRouter);

module.exports = api;
