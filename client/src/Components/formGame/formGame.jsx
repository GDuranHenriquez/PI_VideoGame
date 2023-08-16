import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getPlatForms } from "../../dataRd/actions/index.js";


function FormGame(){


  const location = useLocation();
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const parentPlatforms = useSelector((state) => state.parentPlatforms)

  
  //state
  const [dataState, setDataState] = useState({
    name: '',
    description: '',
    image: '',
    launchDate: '',
    released: '',
    rating: 0,
    genres: [],
    platforms: []
  });

  const [checkGenState, setCheckGenState] = useState(
    new Array(genres.length).fill(false)
  );
  const [checkplatState, setCheckPlatfState] = useState(
    new Array(parentPlatforms.length).fill(false)
  );
  
   

  useEffect(()=>{
    console.log(dataState);
  },[dataState]);

  function handleSubmit(event){
    event.preventDefault();
  };

  const handleString = (e) => {
    if(e.target.name === 'description'){
      setDataState({...dataState, [e.target.name]: e.target.value});
    }else{
      setDataState({...dataState, [e.target.name]:e.target.value});
    }
  };
  const handleNumber = (e) => {
    const regex = /^\d{0,1}(\.\d{1,2})?$/;
    if(regex.test(e.target.value) || e.target.value === ''){
      if(e.target.value === ''){
        setDataState({...dataState, [e.target.name]:e.target.value});
      }else if(e.target.value <= 5 && e.target.value >= 0){
        setDataState({...dataState, [e.target.name]:e.target.value});
      }
    }
  }

  const handleGenre = (e) => {
    const indexCheck = parseInt(e.target.id) - 1;
    const updateChckStateGenre = checkGenState.map((gen, index) => 
      index === indexCheck? !gen : gen
    )
    setCheckGenState(updateChckStateGenre);
  }

  const handlePlatforms= (e) => {
    const indexCheck = parseInt(e.target.id) - 1;
    const updateChckStateplatf = checkplatState.map((plat, index) => 
      index === indexCheck? !plat : plat
    )
    setCheckPlatfState(updateChckStateplatf);
  }

  const handleSubmit = (e) => {

  }

  return <DivFormGame>
    <form onSubmit={handleSubmit} className="formNewGame">
      <div className="data">
        <h1>Data of new game</h1>

        <div className="colectData">
          <h5>Insert videogame name</h5>
          <input className="textInput" type="text" name="name" id="name" onChange={handleString} value={dataState.name}/>
        </div>

        <div className="colectData">
          <h5>insert the url of the videogame image</h5>
          <input className="textInput" type="text" name="image" id="url" onChange={handleString} value={dataState.image}/>
        </div>

        <div className="colectData">
          <h5>Description</h5>
          <textarea className="textareaInput" name="description" id="description" rows="4" onChange={handleString} value={dataState.description}></textarea>
        </div>

        <div className="colectData">
          <h5>Select the release date of the game</h5>
          <input className="dateData" type="date" name="released" id="date" onChange={handleString} value={dataState.released}/>
        </div>

        <div className="colectData">
          <h5>Enter a number from 0 to 5 for the game rankin</h5>
          <input className="numberData" type="number" name="rating" id="number" step='any' onChange={handleNumber} value={dataState.rating}/>
        </div>

        <div className="colectData check">
          <h5>Select the game genres</h5>
          <div className="checkBoxes">
            {checkGenrres(genres, handleGenre)}
          </div>
        </div>

        <div className="colectData check">
          <h5>Select on which platforms the game is available</h5>
          <div className="checkBoxes">
            {checkPlatforms(parentPlatforms, handlePlatforms)}
        </div>
        </div>

      </div>

      <div className="image">
        <h1>Image Preview</h1>
      </div>

      <input type="submit" className='inputSubmit' onSubmit={handleSubmit} value='Add Videogame'></input>
    </form>
  </DivFormGame>
};

const checkGenrres = (genres, handleGenre)=>{
  return genres.map((gen, index) =>(
   <div className="genCheck" key={index}>
    <input type="checkbox" name={gen.name} id={`${gen.id}`} value={gen.name} onChange={handleGenre}/>{gen.name}
   </div>
  ))
}

const checkPlatforms = (platforms, handlePlatforms)=>{
  return platforms.map((platforms, index) =>(
   <div className="genCheck" key={index}>
    <input type="checkbox" name={platforms.name} id={`${platforms.id}`} value={platforms.name} onChange={handlePlatforms}/>{platforms.name}
   </div>
  ))
}

const DivFormGame = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: max-content;
  margin-top: 80px;
  background-color: rgba(0, 0, 0, 0.9);
  .formNewGame{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: max-content;
    color: white;
    font-family: 'Roboto';
  }
  .data{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 70%;
    .colectData{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background-color: transparent;
      height: max-content;
      justify-content: center;
      h5{
        width: 100%;
        height: max-content;
      }
      .textInput{
        border-radius: 5px;
        padding-left: 5px;
        width: 50%;
        height: 20px;
        background-color: rgba(62, 200, 224, 0.75);
        font-weight: bold;
      }
      .textareaInput{
        border-radius: 5px;
        padding-left: 5px;
        width: 50%;
        height: 50px;
        background-color: rgba(62, 200, 224, 0.75);
        font-weight: bold;
      }
      .dateData{
        border-radius: 5px;
        padding-left: 5px;
        width: 30%;
        height: 20px;
        background-color: rgba(62, 200, 224, 0.75);
      }
      .numberData{
        border-radius: 5px;
        padding-left: 5px;
        width: 8%;
        height: 30px;
        background-color: rgba(62, 200, 224, 0.75);
        font-weight: bold;
        text-align: center;
      }      
    }
    .check{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      align-items: center;      
      .checkBoxes{
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(62, 200, 224, 0.5);
        margin-bottom: 20px;
        border-radius: 10px;
        padding: 10px;
        .genCheck{
          width: max-content;
          height: 30px;
        }
      }
      
    }
  }
  .image{
    width: 30%;
  }
  .inputSubmit{
    width: 10%;
    height: 40px;
    border-radius: 5px;
    background-color: rgb(72, 214, 136);
  }
`

export default FormGame;