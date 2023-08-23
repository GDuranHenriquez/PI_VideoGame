import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { resetError, postNewGame, resetNewdata } from "../../dataRd/actions/index.js";


function FormGame(){


  const location = useLocation();
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const parentPlatforms = useSelector((state) => state.parentPlatforms)
  const newDataRedux = useSelector((state) => state.newData)
  const error = useSelector((state) => state.error)

  
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
  const [formError, setFormError] = useState({
    name: 1,
    description: 1,
    image: 1,
    released: 1,
    rating: 1,
  });

  const [checkGenState, setCheckGenState] = useState(
    new Array(genres.length).fill(false)
  );
  const [checkplatState, setCheckPlatfState] = useState(
    new Array(parentPlatforms.length).fill(false)
  ); 
  
  function resetForm(){
    setDataState({
      name: '',
      description: '',
      image: '',
      launchDate: '',
      released: '',
      rating: 0,
      genres: [],
      platforms: []
    })
  }

  useEffect(() => {
    if(newDataRedux){
      swal({
        title: `${newDataRedux.title}`,
        text: `${newDataRedux.message}`,
        icon: "success",
        buttons: false,
      })
      .then((value) => {
        dispatch(resetNewdata());          
      });
      resetForm();
      var updateChckStateGenre = new Array(genres.length).fill(false)
      var updateChckStateplatf = new Array(parentPlatforms.length).fill(false)
      setCheckGenState(updateChckStateGenre);
      setCheckPlatfState(updateChckStateplatf); 
    }
  }, [newDataRedux])

  useEffect(() => {
    if(error){
      swal({
        title: "Error",
        text: 'A game with this name already exists, please check and try again',
        icon: "error",
        buttons: false,
      })
      .then((value) => {
        dispatch(resetError());          
      }); 
    }
  }, [error])

  function handleSubmit(event){
    event.preventDefault();
    const genreArray = [];
    const platfArray = [];
    for(var i = 0; i < checkGenState.length; i++ ){
      if(checkGenState[i]){
        genreArray.push(i+1)
      }
    }
    for(var j = 0; j < checkplatState.length; j++ ){
      if(checkplatState[j]){
        platfArray.push(j+1)
      }
    }
    var ranking = dataState.rating === ''? 0 : dataState.rating;
    const data = {...dataState, 
      genres:genreArray, 
      platforms:platfArray, 
      rating: ranking,
      description: `<p>${dataState.description}</p>`,
      launchDate: dataState.released
    }
    if(genreArray.length === 0){
      return alert('You must choose at least one genre');
    }else if(platfArray.length === 0){
      return alert('you must choose at least one platform');
    }
    for(const key in formError) {
      if (formError[key]) {
        return alert('You must fill in all missing fields in red color');        
      }
    }
    dispatch(postNewGame(data));
    setFormError({
      name: 1,
      description: 1,
      image: 1,
      launchDate: 1,
      released: 1,
      rating: 1,
    })
  };

  const handleString = (e) => {
    if(e.target.name === 'description'){
      setDataState({...dataState, [e.target.name]: e.target.value});
      if(e.target.value === ''){
        setFormError({...formError, [e.target.name]:1})
      }else{
        setFormError({...formError, [e.target.name]:0})
      }
    }else{
      setDataState({...dataState, [e.target.name]:e.target.value});
      if(e.target.value === ''){
        setFormError({...formError, [e.target.name]:1})
      }else{
        setFormError({...formError, [e.target.name]:0})
      }
    }
  };
  const handleNumber = (e) => {
    const regex = /^\d{0,1}(\.\d{1,2})?$/;

    if(regex.test(e.target.value) || e.target.value === ''){
      if(e.target.value === '' || e.target.value === 0){
        setDataState({...dataState, [e.target.name]:e.target.value});
        setFormError({...formError, [e.target.name]:1})
      }else if(e.target.value <= 5 && e.target.value > 0){
        setDataState({...dataState, [e.target.name]:Number.parseFloat(e.target.value)});
        setFormError({...formError, [e.target.name]:0})
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


  return <DivFormGame>
    <form onSubmit={handleSubmit} className="formNewGame">
      <div className="data">
        <h1>Data of new game</h1>

        <div className="colectData">
          <h5>Insert videogame name</h5>
          <input className={`textInput${formError.name? ' error':''}`} type="text" name="name" id="name" onChange={handleString} value={dataState.name}/>
        </div>

        <div className="colectData">
          <h5>insert the url of the videogame image</h5>
          <input className={`textInput${formError.image? ' error':''}`} type="text" name="image" id="url" onChange={handleString} value={dataState.image}/>
        </div>

        <div className="colectData">
          <h5>Description</h5>
          <textarea className={`textareaInput${formError.description? ' error':''}`} name="description" id="description" rows="4" onChange={handleString} value={dataState.description}></textarea>
        </div>

        <div className="colectData">
          <h5>Select the released date of the game</h5>
          <input className={`dateData${formError.released? ' error':''}`} type="date" name="released" id="date" onChange={handleString} value={dataState.released}/>
        </div>

        <div className="colectData">
          <h5>Enter a number from 0 to 5 for the game rankin</h5>
          <input className={`numberData${formError.rating? ' error':''}`} type="number" name="rating" id="number" step='any' onChange={handleNumber} value={dataState.rating}/>
        </div>

        <div className="colectData check">
          <h5>Select the game genres</h5>
          <div className="checkBoxes">
            {checkGenrres(genres, handleGenre, checkGenState)}
          </div>
        </div>

        <div className="colectData check">
          <h5>Select on which platforms the game is available</h5>
          <div className="checkBoxes">
            {checkPlatforms(parentPlatforms, handlePlatforms, checkplatState)}
        </div>
        </div>

        <input type="submit" className='inputSubmit' onSubmit={handleSubmit} value='Add Videogame'></input>

      </div>

      <div className="image">
        <h1>Image Preview</h1>
        <div className="containerImg">
          {dataState.image !== '' && <img src={dataState.image} alt="Screen Shot of your game" />}
        </div>
        
      </div>

      
    </form>
  </DivFormGame>
};

const checkGenrres = (genres, handleGenre, genState)=>{
  return genres.map((gen, index) =>(
   <div className="genCheck" key={index}>
    <input type="checkbox" name={gen.name} id={`${gen.id}`} value={gen.name} onChange={handleGenre} checked = {genState[gen.id-1]}/>{gen.name}
   </div>
  ))
}

const checkPlatforms = (platforms, handlePlatforms, platf)=>{
  return platforms.map((platforms, index) =>(
   <div className="genCheck" key={index}>
    <input type="checkbox" name={platforms.name} id={`${platforms.id}`} value={platforms.name} onChange={handlePlatforms} checked = {platf[platforms.id-1]}/>{platforms.name}
   </div>
  ))
}

const DivFormGame = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
  height: max-content;
  margin-top: 80px;
  background-color: rgba(0, 0, 0, 0.9);
  .formNewGame{
    display: flex;
    flex-wrap: nowrap;
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
      .error{
        border: 4px solid red;
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
    padding: 0px 20px 0px 10px;
    .containerImg{
      width: 100%;
      height: 400px;
      background-size: 100% 100%;
      background-repeat:no-repeat;
      background-size: cover;
      img{       
       width: 100%;
       height: 100%;
       border-radius: 5px;
       
     }
    }
    
  }
  .inputSubmit{
    width: 10%;
    height: 40px;
    border-radius: 5px;
    background-color: rgb(72, 214, 136);
  }
`

export default FormGame;