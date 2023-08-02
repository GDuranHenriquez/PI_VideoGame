const express = require('express');
const { postVideogame, getVideogames } = require('../controllers/videoGames');

const videogameRoutes = express.Router();

videogameRoutes.post('/', postVideogame);
videogameRoutes.get('/', getVideogames);


module.exports = videogameRoutes;