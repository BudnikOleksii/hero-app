const HeroesModel = require('./heroes.mongo');

async function getAllHeroes(skip, limit) {
  return await HeroesModel
    .find({}, { 'createdAt': 0, 'updatedAt': 0, '__v': 0 })
    .skip(skip)
    .limit(limit);
}

async function getHeroById(id) {
  return await HeroesModel.findOne({
    _id: id,
  });
}

async function createNewHero(body) {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = body;

  const newHero = new HeroesModel({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  });

  return await newHero.save();
}

async function removeHeroById(id) {
  return await HeroesModel.findOneAndDelete({
    _id: id,
  });
}

async function updateHeroById(id, body) {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = body;

  const updated = await HeroesModel.updateOne({
    _id: id,
  }, {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  });

  return updated.modifiedCount === 1;
}

module.exports = {
  getAllHeroes,
  getHeroById,
  createNewHero,
  removeHeroById,
  updateHeroById,
};
