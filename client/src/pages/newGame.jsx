import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { allVideogames, getPlatForms, setRouter, cleanDetail } from "../dataRd/actions";

import BackgroundHome from "../Components/home/backgroundHome";
import FormGame from '../Components/formGame/formGame'

function NewGame(){

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    /* dispatch(allVideogames());
    dispatch(getPlatForms()); */
    dispatch(setRouter(location.pathname));
    dispatch(cleanDetail())
  },[]);

  return <DivNewGame>
    <BackgroundHome></BackgroundHome>
    <FormGame></FormGame>
  </DivNewGame>
};

const DivNewGame = styled.div`
  
`

export default NewGame;