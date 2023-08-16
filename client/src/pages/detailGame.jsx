import React, { useEffect } from "react";
import BackgroundHome from "../Components/home/backgroundHome";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getVideoGameId, cleanDetail, setRouter } from '../dataRd/actions/index.js';
import { useLocation } from 'react-router-dom';
import ContentDataDetail from "../Components/detaillVideogame/containDetail";
import styled from 'styled-components'

function DetailGame(props){
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(()=> {
    dispatch(getVideoGameId(id))
    dispatch(setRouter(location.pathname))
    return dispatch(cleanDetail())
  }, [])

  return <DetailContainer>
    <BackgroundHome></BackgroundHome>
    <ContentDataDetail></ContentDataDetail>
  </DetailContainer>
}

const DetailContainer = styled.div`
  
`


export default DetailGame;