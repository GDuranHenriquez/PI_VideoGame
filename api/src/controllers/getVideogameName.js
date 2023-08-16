require('dotenv').config();
const { Videogame, Genre, Platform } = require('../db');
const {  Op } = require('sequelize');
const axios = require('axios');

const {
  API_KEY_RAW
} = process.env;


//url a usar https://api.rawg.io/api/games?search={game}
async function getVideogameSearch(req, res){
  try{
    const name = req.query.name;
    const juegoData = await Videogame.findAll({ 
      where: {
        name:{
          [Op.iLike]:`%${name}%`
        }
      },
      include: [
          {model: Genre, through: { attributes: [] }},
          {model: Platform, through: { attributes: [] }}
        ]
    });

    const { data } = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY_RAW}`);

    res.status(200).json([...juegoData, ...data.results].slice(0,15));
  }catch(error){
    res.status(400).json({error: error.message});
  };
};

module.exports = { getVideogameSearch }