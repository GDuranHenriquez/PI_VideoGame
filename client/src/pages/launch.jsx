import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import styled from "styled-components";

import { allVideogames, getPlatForms, setRouter, cleanDetail } from "../dataRd/actions";
import BackgroundLaunch from "../Components/launch/backGround";

function Launch(){

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    /* dispatch(allVideogames());
    dispatch(getPlatForms()); */
    dispatch(setRouter(location.pathname));
    dispatch(cleanDetail())
  },[]);

  return <LaunchDiv className="launch">
    <BackgroundLaunch></BackgroundLaunch>
    <Link to='/home' className="LinkHome">
      <input type="button" value="GET START" />
    </Link>
  </LaunchDiv>

};

const LaunchDiv = styled.div`
  
`


export default Launch;