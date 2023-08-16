require('dotenv').config();
const { Videogame, Genre, Platform } = require('../db');
const {  Op } = require('sequelize');
const axios = require('axios');

const {
  API_KEY_RAW
} = process.env;

async function getGenres(req, res){
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({error : error.message})
  }
};

module.exports = { getGenres }