import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardVideogame from "./card";
import { useSelector, useDispatch } from "react-redux";
import reanudarDerecha from '../../assets/icons/reanudarDerecha.png';
import { getPageVideogames, getVideoGameId } from '../../dataRd/actions/index.js';
import { useParams } from "react-router-dom";

function CardsVideogame(){
  //variables
  const currentPage = useSelector((state) => state.currentPage);
  const numberPages = useSelector((state) => state.numberPages);
  const numberPage = useSelector((state) => state.numberPage);
  //dispatch
  const dispatch = useDispatch();
  const { id } = useParams();
  //states
    const [numberPageCurrent, setNumberPage] = useState(numberPage);
  
  //Functions
  function changePage(e){
    const name = e.target.name;
    if(numberPageCurrent > 1 && name === 'left'){
      setNumberPage(previuNumberPage => previuNumberPage - 1);
      console.log(numberPageCurrent)
      
    }else if(numberPageCurrent < numberPages && name === 'right'){
      setNumberPage(previuNumberPage => previuNumberPage + 1);
      console.log(numberPageCurrent)
      
    }
  }

  useEffect(()=>{
    dispatch(getPageVideogames(numberPageCurrent));
  }, [numberPageCurrent])

  return <Cards>
    <div className="containerCards">
      { currentPage.map((videoGame, index) => (        
        <CardVideogame
          
          key = {index}
          id = {videoGame.id}
          name = {videoGame.name}
          image = {videoGame.image}
          genres = {videoGame.genres}
          platforms = {videoGame.platforms}
          released = {videoGame.released}
          rating = {videoGame.rating}
          parent_platforms={videoGame.parent_platforms? videoGame.parent_platforms:videoGame.platforms}  
        />
      )) }
    </div>
    <div className="nextPrevius">
      <div className="left">
        <label htmlFor="left" onClick={changePage}>
          <img src={reanudarDerecha} name='left' alt="img previus" className={`previus${numberPageCurrent>1? '': ' hidden'}`} id="left"/>
        </label>
      </div>
      <div className="counter">
        <input type="text" value={numberPageCurrent} disabled/>
      </div>
      <div className="right">
      <label htmlFor="right" onClick={changePage}>
          <img src={reanudarDerecha} name='right' alt="img previus" className={`next${numberPageCurrent===numberPages? ' hidden': ''}`} id="right"/>
        </label>
      </div>
    </div>    
  </Cards>
}

const Cards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
  .containerCards{
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.08);
    padding: 5px 10px 20px 10px; 
  }
  .nextPrevius{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 10px;
    height: max-content;
    label{
      width: max-content;
      height: max-content;
      &:hover{
        cursor: pointer;
      }
    }
    img{
      width: 48px;
      height: 48px;
      object-fit: cover;
      &:hover{
        cursor: pointer;
      }
    }
    .previus{
      transform: rotate(180deg);
    }
    .hidden{
        display: none;
      }
    input{      
      width: 30px;
      height: 30px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.8);
      font-size: 20px;
      font-weight: bold;
      font-family: 'Roboto';
      text-align: center;
      color: white;
    }
  }
`

export default CardsVideogame;