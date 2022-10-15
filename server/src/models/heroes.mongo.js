const mongoose = require('mongoose');

const heroesSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  real_name: {
    type: String,
    required: true,
    unique: true,
  },
  origin_description: {
    type: String,
    required: true,
  },
  superpowers: {
    type: String,
    required: true,
  },
  catch_phrase: {
    type: String,
    required: true,
    unique: true,
  },
  images: [ String ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Hero', heroesSchema);
