import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { setRouter, cleanDetail } from "../dataRd/actions";
import BackgroundLaunch from "../Components/launch/backGround";
import InterfaceBackGround from '../Components/launch/interfaceLaunh'

function Launch(){

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    /* dispatch(allVideogames());
    dispatch(getPlatForms()); */
    dispatch(setRouter(location.pathname));
    dispatch(cleanDetail())
  },[]);

  return <LaunchDiv>
    <BackgroundLaunch></BackgroundLaunch>
    <InterfaceBackGround></InterfaceBackGround>
  </LaunchDiv>

};

const LaunchDiv = styled.div` 
    
`


export default Launch;