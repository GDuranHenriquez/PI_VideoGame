const express = require('express');
const { postVideogame, getVideogames, getVideogameid } = require('../controllers/videoGames');

const videogameRoutes = express.Router();

videogameRoutes.post('/', postVideogame);
videogameRoutes.get('/', getVideogames);
videogameRoutes.get('/:id', getVideogameid);

module.exports = videogameRoutes;