import React, { useEffect, useState } from "react";
import BackgroundHome from "../Components/home/backgroundHome";
import NavBarHome from "../Components/home/navBar";
import { useDispatch, useSelector } from "react-redux";
import { allVideogames, getPlatForms, setRouter, cleanDetail, getGenres } from "../dataRd/actions";
import CardsVideogame from "../Components/cards/cards";
import { useLocation } from 'react-router-dom';
import Loader from "../Components/loader/Loader";

function Home(){
  const location = useLocation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const numberPages = useSelector((state) => state.numberPages);
  
  useEffect(()=>{
    /* dispatch(allVideogames());
    dispatch(getPlatForms()); */
    if(!(numberPages > 0)){
      dispatch(getPlatForms());
      dispatch(getGenres())
      dispatch(allVideogames());      
    }
    dispatch(setRouter(location.pathname));
    dispatch(cleanDetail());
    
  },[]);

  return <div className="home">
    <BackgroundHome></BackgroundHome>
    {!(numberPages > 0) && <Loader/>}    
    {(numberPages) && <CardsVideogame></CardsVideogame>}    
  </div>
};

export default Home;