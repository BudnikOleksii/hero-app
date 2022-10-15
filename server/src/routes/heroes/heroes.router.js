const express = require('express');
const {
  httpGetAllHeroes, httpAddNewHero, httpRemoveHeroById, httpUpdateHeroById
} = require('./heroes.controller');

const heroesRouter = express.Router();

heroesRouter.get('/', httpGetAllHeroes);
heroesRouter.post('/', httpAddNewHero);
heroesRouter.delete('/:id', httpRemoveHeroById);
heroesRouter.patch('/:id', httpUpdateHeroById);

module.exports = heroesRouter;
