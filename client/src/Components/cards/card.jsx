import React from "react";
import styled from "styled-components";
import icons from '../../assets/icons/cards/exportIcons.js';
import ratingIconPng from '../../assets/icons/rating.png';
import { Link } from "react-router-dom";


//import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
//import { start } fromt '@fort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from "react-redux";

//import actions
import { getVideoGameId } from '../../dataRd/actions/index.js'

function CardVideogame({id, name, image, genres, platforms, released, rating, parent_platforms}){  

  return <Card to={`/detailgame/${id}`}>
    <div className="image">
      <img src={image} alt={`imagen de ${name}`} />
    </div>
    <div className="data">
      <div className="nameVideoGame">
        <p>{name}</p>
      </div>
      <div className="platformVideoGame">
        {platformsValue(platforms)}
      </div>
      <div className="iconPlatfVideoGame">
        {platformsIcon(parent_platforms)}
      </div>
      <div className="rating">
          {startRating(rating)}
      </div>
    </div>
  </Card>
}

const platformsValue = (platf) =>{
  /* var counter = 1;
  var platforms_value = [];
  for(var i = 0; i<platf.length; i++){
    if(i=== 0){
      platforms_value.push({
       name: platf[i].platform.name,
       id: platf[i].platform.id,
       class: 'derecha'
      })
    }if(i=== 0){
      platforms_value.push({
       name: platf[i].platform.name,
       id: platf[i].platform.id,
       class: 'derecha'
      })
    }             
  } */
  return <>    
    {platf.map((plaform) =>(      
      <p key={plaform.platform? plaform.platform.id:plaform.id }>{plaform.platform? plaform.platform.name:plaform.name}</p>      
    ))
    }
  </>  
}

const platformsIcon = (parent_platf) => {

  return <>
    {parent_platf.map((parent) => (
      <img key={parent.platform?parent.platform.id:parent.id} src= {icons[parent.platform?parent.platform.name:parent.name ]} alt={`icon of ${parent.platform?parent.platform.name:parent.name}`} ></img>
    ))}
  </>
};

const startRating = (rating) => {
  //Numero de estrellas
  const totalStars = 5;
  //calculamos el numero de estrelas a llenar
  const filledStars = Math.floor(rating);
  //Calculamos cuanto falta por llenar de la ultima estrella
  const remainingPercentage = rating - filledStars;
  const backstars = [];
  
  const star = <FontAwesomeIcon icon={faStar} />
  

  const percentage = (rating/5)*100;

  return <div className="backStart">
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <div className="frontStart" style={{width: percentage +`%`}}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>

  /* for(var i = 1; i <= totalStars; i++){
    if(i <= filledStars){
      stars.push(<FaStar key={i} />)
    }else if(i === filledStars + 1 && remainingPercentage > 0 ){
      stars.push(<FaStarHalfAlt key={i}/>)
    }else{
      stars.push(<FaRegStar key={i}/>)
    }
  }

  return <div className="start-rating">{stars}</div> */



}

const Card = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 500px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.76);
  box-shadow: 2px 3px 3px rgba(8, 198, 241, 0.5);
  cursor: pointer;
  text-decoration: none;
  .image{
    width: 100%;
    height: 250px;
    border-radius: 5px 5px 0px 0px;
    img{
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 5px 5px 0px 0px;
      /* background-size: 100% 100%;
      background-repeat: no-repeat;
      background-size: cover; */
    }
  }
  .data{
    width: 100%;
    height: 250px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .nameVideoGame{
      width: 100%;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      p{
        color: white;
        font-family: 'Roboto';
        font-size: 18px;
      }

    }
    .platformVideoGame{
      width: 90%;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      gap: 0px;
      justify-content: center;
      p{
        margin: 0px 0px 5px 0px;
        height: 15px;
        color: white;
        font-family: 'Roboto';
        font-size: 12px;
        border-left: 2px solid rgba(255, 255, 255, 0.2);
        border-right: 2px solid rgba(255, 255, 255, 0.2);
        padding: 0px 5px 0px 5px;
      }
    }
    .iconPlatfVideoGame{
      width: 90%;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      gap: 0px;
      justify-content: center;
    }
    .iconPlatfVideoGame{
      width: 90%;
      height: max-content;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      img{
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 5px;
        width: 20px;
        height: 20px;
        padding: 5px;
      }
    }
    .rating{
      height: max-content;
      display: flex;
      justify-content: center;
      //background-image: url(${ratingIconPng});
      .backStart{
        display: flex;
        position: relative;
        color: rgb(255, 255, 255, 0.2);
        .frontStart{
          display: flex;
          color: #FFBC0B;
          overflow: hidden;
          position: absolute;
          top: 0;
        }
      }
    }
  }
  &:hover{
    transform: translateY(-10px) translateX(-10px) rotate(-1deg);
    
  }
`

export default CardVideogame;