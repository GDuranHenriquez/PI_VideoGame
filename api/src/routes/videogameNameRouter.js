const express = require('express');
const { getVideogameSearch } = require('../controllers/getVideogameName.js');

const videogameNameRouter = express.Router();


videogameNameRouter.get("/", getVideogameSearch);


module.exports = videogameNameRouter;