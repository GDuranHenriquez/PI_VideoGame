require('dotenv').config();
const { Videogame, Genre, Platform } = require('../db');
const { where, Op, QueryTypes, INTEGER } = require('sequelize');
const axios = require('axios');

const {
  API_KEY_RAW
} = process.env;

async function postVideogame(req , res){
  /* Los datos recibidos para registrar un juego correspondientes a platforms y genres
  solo deben contener los id correspondientes a sus nombres, según estan guardados en los modelos.*/
  try {
    var {name, description, image, launchDate, rating, platforms, genres} = req.body;
    if(!name || !description || !image || !launchDate || !rating || !platforms || !genres){
      return res.status(404).send('Falta enviar datos obligatorios');
    };
    //name description image launchDate rating
    const videoJuego = await Videogame.create({
      name: name, description: description, image: image, launchDate: launchDate, rating: rating});
    
    genres = await Genre.findAll({
      where: {
        id: { [Op.in]: genres } 
      },
      //raw: true,
    });

    platforms = await Platform.findAll({
      where: {
        id: { [Op.in]: platforms }
      },
      //raw: true,
    });
    //genres2 = await 

        
    videoJuego.addGenres([...genres]);
    videoJuego.addPlatforms([...platforms]);

    /* genres = JSON.stringify(genres, null, 2);
    platforms = JSON.stringify(platforms, null, 2); */

    videoJuego.dataValues.platforms = platforms;
    videoJuego.dataValues.genres = genres; 
    
    return res.status(201).json(videoJuego);

  } catch (error) {
    return res.status(404).send(error.message);
  };
};

async function getVideogames(req, res){
  try {
    if(req.query.id){
      const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
      const { id } = req.query;

      if(regex.test(id)){
        const { id } = req.query;
        const modelVideogame = await Videogame.findByPk( id,{
          include: [
            {model: Genre, through: { attributes: [] }},
            {model: Platform, through: { attributes: [] }}
          ],
          option: { raw: true }
        });      
        return res.status(200).json(modelVideogame)
      }else{
        var { data } = await axios(`https://api.rawg.io/api/games/${req.query.id}?key=${API_KEY_RAW}`);      
        return res.status(200).json(data);
      };      
      
    };

    var modelVideogame = await Videogame.findAll({
      include: [
        {model: Genre, through: { attributes: [] }},
        {model: Platform, through: { attributes: [] }}
      ],
      option: { raw: true }
    });

    console.log(modelVideogame instanceof Videogame);

    var { data } = await axios(`https://api.rawg.io/api/games?key=${API_KEY_RAW}`);

    return res.status(200).json([...modelVideogame, ...data.results]);
    
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

async function getVideogameSearch(req, res){
  try{

  }catch(error){

  };
};

async function getVideogamesGenres(){
  try {
  
  }catch (error) {
  
  }
};

/* async function getNextVideogame(req, res){
  try {
    
  } catch (error) {
    
  }
}; */

/* async function getVideogamesID(req, res){
  try {
    var modelVideogame = await Videogame.findAll({ where:{id: req.query.id },
      include: [
        {model: Genre, through: { attributes: [] }},
        {model: Platform, through: { attributes: [] }}
      ]
    });
    if(modelVideogame){
      return res.status(200).json(modelVideogame)
    }
    var { data } = await axios(`https://api.rawg.io/api/games/${req.query.id}?key=${API_KEY_RAW}`);
    
    return res.status(200).json(data);

  } catch (error) {
    return res.status(404).json({error: error.message});
  };
} */



module.exports = { postVideogame, getVideogames }