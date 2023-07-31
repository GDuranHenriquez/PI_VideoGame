const { Router } = require('express');
const { Videogame, Genres } = require('../db');
const { where } = require('sequelize');


const router = Router();

router.post('/', async (req, res)=>{
  try {
    const {name, description, image, launchDate, rating, platforms, genres} = req.body;
    if(!name || !description || !image || !launchDate || !rating || !platforms || !genres){
      return res.status(404).send('Falta enviar datos obligatorios');
    };
    //name description image launchDate rating
    const videoJuego = await Videogame.create({
      name: name, description: description, image: image, launchDate: launchDate, rating: rating});
    
    

    return res.status(201).json(videoJuego);

  } catch (error) {
    
  }
});