const express = require('express');
const {
  httpGetAllHeroes,
  httpAddNewHero,
  httpRemoveHeroById,
  httpUpdateHeroById,
  httpGetHeroById
} = require('./heroes.controller');

const heroesRouter = express.Router();

heroesRouter.get('/', httpGetAllHeroes);
heroesRouter.get('/:id', httpGetHeroById);
heroesRouter.post('/', httpAddNewHero);
heroesRouter.delete('/:id', httpRemoveHeroById);
heroesRouter.patch('/:id', httpUpdateHeroById);

module.exports = heroesRouter;
