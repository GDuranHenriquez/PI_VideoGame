const express = require('express');
const { postVideogame, getVideogames, getVideogameSearch } = require('../controllers/videoGames');

const videogameRoutes = express.Router();

videogameRoutes.post('/', postVideogame);
videogameRoutes.get('/', getVideogames);
videogameRoutes.get('/?search');
videogameRoutes.get('/genre/');


module.exports = videogameRoutes;