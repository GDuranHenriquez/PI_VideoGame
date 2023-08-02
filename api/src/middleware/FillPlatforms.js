require('dotenv').config();
const { Platform } = require('../db');
const axios = require('axios');

const { API_KEY_RAW } = process.env;

async function inicializatePlatforms(){
  try {
    var { data } = await axios(`https://api.rawg.io/api/platforms?key=${API_KEY_RAW}`);
    data = data.results;
    data.forEach(async platforms => {
      await Platform.create({name: platforms.name})
    });
  } catch (error) {
    console.error('Error al insertar datos de plataformas:', error);
  };
};

module.exports = inicializatePlatforms;