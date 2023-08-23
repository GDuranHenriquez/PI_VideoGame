require('dotenv').config();
const { Videogame, Genre, Platform } = require('../db');
const {  Op } = require('sequelize');
const axios = require('axios');
const { getVideogames } = require('./videoGames.js'); 


const {
  API_KEY_RAW
} = process.env;

async function findAllVidegameDB(){
  var modelVideogame = await Videogame.findAll({
    include: [
      {model: Genre, through: { attributes: [] }},
      {model: Platform, through: { attributes: [] }}
    ],
    option: { raw: true }
  });
  return JSON.stringify(modelVideogame, null, 2);  
};

async function findAllVideoGameRaw(){
  //Extraer de la api los primeros 100 videojuegos
  const pagesNumbers = [1, 2, 3, 4];
  const pagesZise = 25; 
  var videoGames = [];
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
  return videoGames;
};

function filterGen(data , genre){
  var newVideoGameRaw = [];
  data.forEach( game => {
    var gen = game.genres;
    for(let i = 0; i < gen.length; i++){
      var nameGen = gen[i].name.toLowerCase();
      if(nameGen.includes(genre.toLowerCase())){
        newVideoGameRaw.push(game);
        break;
      }
    }
  });
  return newVideoGameRaw;
}

function filterRating(data, range){
  const newData = data.filter(game => {
    const gameRatin = game.rating;
    return gameRatin >= range[0] && gameRatin <= range[1];
  });
  return newData
}

function varifyRating(arr){
  var arrMaxMin = arr.split(',');
  arrMaxMin = arrMaxMin.map( (rt) => parseFloat(rt));
  if((arrMaxMin[0] >= 0) && (arrMaxMin[0]<= arrMaxMin[1]) && (arrMaxMin[1] <= 5)){
    return {isRating: true, rating: arrMaxMin}
  }else{
    return {isRating: true, rating: arrMaxMin}
  }
};

function filterName(data, nameFilter){  
  if(nameFilter === 'up'){
    var newVideoGameRaw = data.sort((a,b) => a.name.localeCompare(b.name));
  }else if(nameFilter === 'down'){
    var newVideoGameRaw = data.sort((a,b) => b.name.localeCompare(a.name));
  }
  return newVideoGameRaw;
}


async function getGameFilter(req, res){
  try {
    const { name, rating, genre, origin } = req.query;
    
    if(rating){
      var newRating = varifyRating(rating);
    }

    if(origin && genre && name){
      
      if(origin === 'db'){
        var videogameDB = await findAllVidegameDB();
        videogameDB = JSON.parse(videogameDB);

        if(videogameDB.length > 0){
          videogameDB = filterGen(videogameDB, genre);
          if(videogameDB.length > 0 && (name === 'up' || name === 'down')){
            videogameDB = filterName(videogameDB, name);
          }else if(videogameDB.length === 0){
            return res.status(200).json(videogameDB);
          }else{
            return res.status(400).json({error:'Filter type sent for order by name is not correct'})
          }
        }       
        return res.status(200).json(videogameDB);

      }else if(origin === 'raw'){        
        var videoGameRaw = await findAllVideoGameRaw();
        if(videoGameRaw.length > 0){
          videoGameRaw = filterGen(videoGameRaw, genre)
          if(videoGameRaw.length > 0 && (name === 'up' || name === 'down')){
            videoGameRaw = filterName(videoGameRaw, name)
          }else if(videoGameRaw.length === 0){
            return res.status(200).json(videogameDB);
          }else{
            return res.status(400).json({error:'Filter type sent for order by name is not correct'})
          }
        }
        return res.status(200).json(videoGameRaw);
      }else{
        return res.status(400).json({error: 'The type of filter sent for the origin is not correct'})
      }

    }else if(origin && genre && rating){      

      if(origin === 'db'){
        var videogameDB = await findAllVidegameDB();
        if(videogameDB.length > 0){
          videogameDB = filterGen(videogameDB, genre);
          if(videogameDB.length > 0 && newRating.isRating){
            videogameDB = filterRating(videogameDB, newRating.rating);
          }else if(!newRating.isRating){
            return res.status(400).json({error: "el rango enviado no es correcto, por favor envie el formato correcto 'max,min'" });
          }
        }
        return res.status(200).json(videogameDB);
        
      }else if(origin === 'raw'){        
        var videoGameRaw = await findAllVideoGameRaw();
        if(videoGameRaw.length > 0){
          videoGameRaw = filterGen(videoGameRaw, genre);
          if(videoGameRaw.length > 0 && newRating.isRating){
            videoGameRaw = filterRating(videoGameRaw, newRating.rating);
          }else if(!newRating.isRating){
            return res.status(400).json({error: "el rango enviado no es correcto, por favor envie el formato correcto 'max,min'" });
          }
        }
        return res.status(200).json(videoGameRaw);
        
      }else{
        return res.status(400).json({error: 'The type of filter sent for the origin is not correct'})
      }

    }else if(origin && name){
      if(origin === 'db'){
        var videogameDB = await findAllVidegameDB();
        videogameDB = JSON.parse(videogameDB);

        if(videogameDB.length > 0 && (name === 'up' || name === 'down')){
          videogameDB = filterName(videogameDB, name);
        }else if(videogameDB.length === 0){
          return res.status(200).json(videogameDB);
        }else{
          res.status(400).json({error: "The filter type sent for the order by name is not correct, it should be 'up' or 'down" })
        };
        return res.status(200).json(videogameDB);

      }else if(origin === 'raw'){
        var videoGameRaw = await findAllVideoGameRaw();
        if(videoGameRaw.length > 0 && (name === 'up' || name === 'down')){
          videoGameRaw = filterName(videoGameRaw, name);
        }else if(videoGameRaw.length === 0){
          return res.status(200).json(videoGameRaw);
        }else{
          res.status(400).json({error:"The filter type sent for the order by name is not correct, it should be 'up' or 'down"})
        };
        return res.status(200).json(videoGameRaw);

      }else{
        return res.status(400).json({error: 'The type of filter sent for the origin is not correct'})
      }
    }else if(origin && rating){
      if(origin === 'db'){
        var videogameDB = await findAllVidegameDB();
        videogameDB = JSON.parse(videogameDB);

        if(videogameDB.length > 0 && newRating.isRating){
          videogameDB = filterRating(videogameDB, newRating.rating);
        }else if(!newRating.isRating){
          return res.status(400).json({error: "el rango enviado no es correcto, por favor envie el formato correcto 'max,min'" });
        }
        return res.status(200).json(videogameDB);

      }else if(origin === 'raw'){
        var videoGameRaw = await findAllVideoGameRaw();
        if(videoGameRaw.length > 0 && newRating.isRating){
          videoGameRaw = filterRating(videoGameRaw, newRating.rating);
        }else if(!newRating.isRating){
          return res.status(400).json({error: "el rango enviado no es correcto, por favor envie el formato correcto 'max,min'" });
        }
        return res.status(200).json(videoGameRaw);

      }else{
        return res.status(400).json({error: 'The type of filter sent for the origin is not correct'})
      }
    }else if(origin && genre){
      if(origin === 'db'){
        var videogameDB = await findAllVidegameDB();
        videogameDB = JSON.parse(videogameDB);

        if(videogameDB.length > 0){
          videogameDB = filterGen(videogameDB, genre);
        }
        return res.status(200).json(videogameDB);

      }else if(origin === 'raw'){
        var videoGameRaw = await findAllVideoGameRaw();

        if(videoGameRaw.length > 0){
          videoGameRaw = filterGen(videoGameRaw, genre);
        }
        return res.status(200).json(videoGameRaw);

      }else{
        return res.status(400).json({error: 'The type of filter sent for the origin is not correct'})
      }
    }else if(genre && name){
      var videogameDB = await findAllVidegameDB();
      videogameDB = JSON.parse(videogameDB);
      var videoGameRaw = await findAllVideoGameRaw();
      var data = [...videogameDB, ...videoGameRaw];
      data = filterGen(data, genre);

      if(data.length > 0 && (name === 'up' || name === 'down')){
        data = filterName(data, name);
      }else if(data.length === 0){
        return res.status(200).json(data);
      }else{
        res.status(400).json({error: "The filter type sent for the order by name is not correct, it should be 'up' or 'down" })
      };
      return res.status(200).json(data);

    }else if(genre && rating){
      var videogameDB = await findAllVidegameDB();
      videogameDB = JSON.parse(videogameDB);
      var videoGameRaw = await findAllVideoGameRaw();
      var data = [...videogameDB, ...videoGameRaw];
      data = filterGen(data, genre);

      if(data.length > 0 && newRating.isRating){
        data = filterRating(data, newRating.rating);
      }else if(!newRating.isRating){
        return res.status(400).json({error: "el rango enviado no es correcto, por favor envie el formato correcto 'max,min'" });
      }
      return res.status(200).json(data);

    }else if(origin){
      if(origin === 'db'){
        var videogameDB = await findAllVidegameDB();
        videogameDB = JSON.parse(videogameDB);
        return res.status(200).json(videogameDB);

      }else if(origin === 'raw'){
        var videoGameRaw = await findAllVideoGameRaw();
        return res.status(200).json(videoGameRaw);

      }else{
        return res.status(400).json({error: 'The type of filter sent for the origin is not correct'})
      }
    }else if(name){
      var videogameDB = await findAllVidegameDB();
      videogameDB = JSON.parse(videogameDB);
      var videoGameRaw = await findAllVideoGameRaw();
      var data = [...videogameDB, ...videoGameRaw];
      if(name === 'up' || name === 'down'){
        data = filterName(data, name);        
      }else{
        res.status(400).json({error: "The filter type sent for the order by name is not correct, it should be 'up' or 'down" })
      };
      return res.status(200).json(data);

    }else if(rating){
      var videogameDB = await findAllVidegameDB();
      videogameDB = JSON.parse(videogameDB);
      var videoGameRaw = await findAllVideoGameRaw();
      var data = [...videogameDB, ...videoGameRaw];
      if(data.length > 0 && newRating.isRating){
        data = filterRating(data, newRating.rating);
      }else if(!newRating.isRating){
        return res.status(400).json({error: "el rango enviado no es correcto, por favor envie el formato correcto 'max,min'" });
      }
      return res.status(200).json(data);
    }else if(genre){
      var videogameDB = await findAllVidegameDB();
      videogameDB = JSON.parse(videogameDB);
      var videoGameRaw = await findAllVideoGameRaw();
      var data = [...videogameDB, ...videoGameRaw];
      data = filterGen(data, genre);
      return res.status(200).json(data);
    }

  } catch (error) {
    return res.status(400).json({error: error.message});
  }

}

module.exports = { getGameFilter }