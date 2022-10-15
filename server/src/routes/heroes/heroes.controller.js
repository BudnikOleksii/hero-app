const { getPagination } = require('../../services/query');
const { getAllHeroes, createNewHero, removeHeroById, updateHeroById, getHeroById} = require('../../models/heroes.model');

async function httpGetAllHeroes(req, res) {
  const { skip, limit } = getPagination(req.query);

  try {
    const heroes = await getAllHeroes(skip, limit);

    return res.status(200).json(heroes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Cannot get heroes',
    });
  }
}

async function httpGetHeroById(req, res) {
  const { id } = req.params;

  try {
    const hero = await getHeroById(id);

    return res.json(hero);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Cannot find hero',
    });
  }
}

async function httpAddNewHero(req, res) {
  try {
    const newHero = await createNewHero(req.body);

    return res.status(201).json(newHero);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Cannot create new hero',
    });
  }
}

async function httpRemoveHeroById(req, res) {
  const { id } = req.params;

  try {
    const deletedHero = await removeHeroById(id);

    return res.json(deletedHero);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Cannot delete hero',
    });
  }
}

async function httpUpdateHeroById(req, res) {
  const { id } = req.params;

  try {
    const updated = await updateHeroById(id, req.body);

    if (!updated) {
      return res.status(400).json({
        error: 'Cannot update hero',
      });
    }

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Cannot update hero',
    });
  }
}

module.exports = {
  httpGetAllHeroes,
  httpGetHeroById,
  httpAddNewHero,
  httpRemoveHeroById,
  httpUpdateHeroById,
};
