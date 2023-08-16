const { Router } = require('express');
const { getPlatForms } = require('../controllers/getPlatforms.js');


const platformsRouter = Router();

platformsRouter.use('/', getPlatForms);

module.exports = platformsRouter;