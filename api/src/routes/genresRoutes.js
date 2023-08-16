const { Router } = require('express');
const { getGenres } = require('../controllers/getGenres.js');


const genresRouter = Router();

genresRouter.use('/', getGenres);

module.exports = genresRouter;