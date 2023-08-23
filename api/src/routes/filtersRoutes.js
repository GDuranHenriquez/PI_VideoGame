const { Router } = require('express');
const { getGameFilter } = require('../controllers/filters.js');

const filtersRouters = Router();

filtersRouters.use('/', getGameFilter);

module.exports = filtersRouters;