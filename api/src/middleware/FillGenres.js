require('dotenv').config();
const { Genre } = require('../db');
const axios = require('axios');

const { API_KEY_RAW } = process.env;

async function inicializateGenres(){
  try {
    var { data } = await axios(`https://api.rawg.io/api/genres?key=${API_KEY_RAW}`);
    data = data.results;
    data.forEach(async genre => {
      await Genre.create({name: genre.name})
    });
  } catch (error) {
    console.error('Error al insertar datos iniciales en Genre:', error);
  }
}

module.exports = inicializateGenres;