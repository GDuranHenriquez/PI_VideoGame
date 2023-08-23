require('dotenv').config();
const { Videogame, Genre, Platform } = require('../db');
const {  Op } = require('sequelize');
const axios = require('axios');

const {
  API_KEY_RAW
} = process.env;

//urls a usar
//Get screenshots https://api.rawg.io/api/games/3498/screenshots?key={Api_Key}
//Get Traylers https://api.rawg.io/api/games/3498/movies?key={Api_Key}
//Get list Videogames https://api.rawg.io/api/games?key={Api_Key}&page_size=${pagesZise}
//Get videoGame por id

async function postVideogame(req , res){
  /* Los datos recibidos para registrar un juego correspondientes a platforms y genres
  solo deben contener los id correspondientes a sus nombres, según estan guardados en los modelos.*/
  try {
    var {name, description, image, launchDate, released ,rating, platforms, genres} = req.body;
    if(!name || !description || !image || !launchDate || !rating || !platforms || !genres || !released){
      return res.status(404).send('Falta enviar datos obligatorios');
    };
    //name description image launchDate rating
    const videoJuego = await Videogame.create({
      name: name, description: description, image: image, launchDate: launchDate, released:released, rating: rating});
    
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
    //Extraer de la base de datos todos los video juegos.
    var modelVideogame = await Videogame.findAll({
      include: [
        {model: Genre, through: { attributes: [] }},
        {model: Platform, through: { attributes: [] }}
      ],
      option: { raw: true }
    });    
    //Extraer de la api los primeros 100 videojuegos
    const pagesNumbers = [1, 2, 3, 4];
    const pagesZise = 25; 
    const videoGames = [];
    for(var i = 0; i < pagesNumbers.length; i++){
      var { data } = await axios(`https://api.rawg.io/api/games?key=${API_KEY_RAW}&page=${pagesNumbers[i]}&page_size=${pagesZise}`);
      
      data = data.results;
      data.forEach(game => {
          videoGames.push({
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.genres,
          platforms: game.platforms,
          released: game.released,
          rating: game.rating,
          parent_platforms: game.parent_platforms
      })});     
    };
    return res.status(200).json([...modelVideogame, ...videoGames]);
    
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

async function getVideogameid(req, res){
  try {    
    //Buscamos el video juego por id si este es pedido
    const id = req.params.id
    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;  
    
    if(regex.test(id)){
      var modelVideogame = await Videogame.findByPk( id,{
        include: [
          {model: Genre, through: { attributes: [] }},
          {model: Platform, through: { attributes: [] }}
        ],
        options: { raw: true }
      });
      
      //modelVideogame = JSON.parse(modelVideogame);
      

      const genres = [];
      const platforms = [];

      modelVideogame.platforms.forEach(pfrm =>{
        platforms.push(pfrm.name)
      });
       modelVideogame.genres.forEach(gen => {
        genres.push(gen.name)
      });

      

      modelVideogame.genres = genres;
      modelVideogame.platforms = platforms;
      var data = {
        id: modelVideogame.id,
        name: modelVideogame.name,
        description: modelVideogame.description,
        image: modelVideogame.image,
        released: modelVideogame.released,
        rating: modelVideogame.rating,
        genres: genres,
        platforms: platforms
      }
      return res.status(200).json(data);
    }else{
      var { data } = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY_RAW}`);
      var traylers = await axios(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY_RAW}`);
      var screenshots = await axios(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY_RAW}`);
      
      const platforms = [];
      const parent_platforms = [];
      const genres = [];
      const screenshots_lis = [];
      const traylers_lis = [];

      data.platforms.forEach(pfrm =>{
        platforms.push(pfrm.platform.name)
      });
      data.parent_platforms.forEach(ppfrm =>{
        parent_platforms.push(ppfrm.platform.name)
      })
      data.genres.forEach(gen => {
        genres.push(gen.name)
      });
      screenshots.data.results.forEach(screen =>{
        screenshots_lis.push(screen.image);
      });
      traylers.data.results.forEach(movie =>{
        traylers_lis.push({max: movie.data.max, min :movie.data[480]})
      });

      data = {
        id: data.id,
        name: data.name,
        description: data.description,
        released: data.released,
        image: data.background_image,
        rating: data.rating,
        parent_platforms: parent_platforms,//Marca de las plataformas
        platforms: platforms,//nombre plataformas exactos
        genres: genres,
        screenshots_lis: screenshots_lis,
        traylers_lis: traylers_lis
      }
      return res.status(200).json(data);
    };
  } catch (error) {
    return res.status(400).json({error: error.message});
  }  
};

module.exports = { postVideogame, getVideogames, getVideogameid }