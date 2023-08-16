import React, { useEffect } from "react";
import BackgroundHome from "../Components/home/backgroundHome";
import NavBarHome from "../Components/home/navBar";
import { useDispatch } from "react-redux";
import { allVideogames, getPlatForms, setRouter, cleanDetail } from "../dataRd/actions";
import CardsVideogame from "../Components/cards/cards";
import { useLocation } from 'react-router-dom';

function Home(){
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    /* dispatch(allVideogames());
    dispatch(getPlatForms()); */
    dispatch(setRouter(location.pathname));
    dispatch(cleanDetail())
  },[]);

  return <div className="home">
    <BackgroundHome></BackgroundHome>    
    <CardsVideogame></CardsVideogame>
  </div>
};

export default Home;