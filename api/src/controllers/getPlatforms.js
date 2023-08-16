require('dotenv').config();
const { Videogame, Genre, Platform } = require('../db');
const {  Op } = require('sequelize');
const axios = require('axios');

const {
  API_KEY_RAW
} = process.env;

async function getPlatForms(req, res){
  try {
    const platforms = await Platform.findAll();
    res.status(200).json(platforms);
  } catch (error) {
    res.status(400).json({error : error.message})
  }
};

module.exports = { getPlatForms }