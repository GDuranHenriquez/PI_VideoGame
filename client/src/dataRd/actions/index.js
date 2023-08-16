import { SEARCH_ALL_VIDEOGAME, SEARCH_ID_VIDEOGAME, SEARCH_NAME_VIDEOGAME, SLICE_VIDEOGAME, PLATFORMS, CLEAN_DETAIL, ROUTER_PAGE, GENRES } from './types.js';
import axios from 'axios';

const ENDPOINT_VIDEOGAME  = process.env.REACT_APP_ENDPOINT_VIDEOGAME;

export const allVideogames = () =>{
  const endpoint = ENDPOINT_VIDEOGAME + '/videogames';
  return (dispatch) => {
    axios.get(endpoint).then(({data}) => {
      return dispatch({
        type: SEARCH_ALL_VIDEOGAME,
        payload: data
      });
    });
  };
};

export const getPageVideogames = (number) =>{
    return {
      type: SLICE_VIDEOGAME,
      payload: number
    }
};

export const getPlatForms = () => {
  const endPoint = ENDPOINT_VIDEOGAME + '/videogames/platforms'
  return (dispatch) => {
    axios.get(endPoint).then(({data}) => {
      return dispatch({
        type: PLATFORMS,
        payload: data
      })
    });    
  };
};

export const getGenres = () => {
  const endPoint = ENDPOINT_VIDEOGAME + '/videogames/genres'
  return (dispatch) => {
    axios.get(endPoint).then(({data}) => {
      return dispatch({
        type: GENRES,
        payload: data
      })
    });    
  };
};

export const getVideoGameId = (id) => {
  const endPoint = ENDPOINT_VIDEOGAME + `/videogames/${id}`;
  return (dispatch) => {
    axios.get(endPoint).then(({data}) => {
      return dispatch({
        type: SEARCH_ID_VIDEOGAME,
        payload: data
      })
    });
  };
}

export const cleanDetail = () =>{
  return {
    type: CLEAN_DETAIL,
    payload: []
  }
};

export const setRouter = (router) =>{
  return {
    type: ROUTER_PAGE,
    payload: router
  }
};

