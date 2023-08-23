import { SEARCH_ALL_VIDEOGAME, SEARCH_ID_VIDEOGAME, SLICE_VIDEOGAME, PLATFORMS, CLEAN_DETAIL, ROUTER_PAGE, GENRES, POST_GAME, SEARCH_GAME_NAME, FILTERT_VIDEOGAME, RESET_NUMBER_PAGE, NO_DATA, ERROR, SET_FILTERS, RESET_NO_DATA, RESET_NEW_DATA } from './types.js';
import axios from 'axios';

const ENDPOINT_VIDEOGAME  = process.env.REACT_APP_ENDPOINT_VIDEOGAME;
export const getVideogameByName = (name) => {
  try {
    const endPoint = ENDPOINT_VIDEOGAME + `/videogames/name?name=${name}`;
    return (dispatch) => {
      axios.get(endPoint).then(({data}) => {
        return dispatch({
          type:SEARCH_GAME_NAME,
          payload: data
        })
      }).catch((error) => {
        var err = error.response;
        return dispatch({
          type: ERROR,
          payload: err.data.error
        });
      });
    }
  } catch (error) {
    
  }
};

export const allVideogames = () =>{
  const endpoint = ENDPOINT_VIDEOGAME + '/videogames';
  return (dispatch) => {
    axios.get(endpoint).then(({data}) => {
      return dispatch({
        type: SEARCH_ALL_VIDEOGAME,
        payload: data
      });
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: ERROR,
        payload: err.data.error
      });
    });;
  };
};

export const filterGetGame = (filters) => {
  const partRouteFilters = (filt) => {
    const pathRoute = [];
    for (const filter in filt) {
      if (filt[filter]) {
        pathRoute.push(`${filter}=${filt[filter]}`)        
      }
    }
    return `/videogames/filters?${pathRoute.join('&')}`;
  };
  const endpoint = ENDPOINT_VIDEOGAME + partRouteFilters(filters); 
  console.log(endpoint);
  return (dispatch) => {
    axios.get(endpoint).then(({data}) => {
      return dispatch({
        type:FILTERT_VIDEOGAME,
        payload:data
      })
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: ERROR,
        payload: {
          status: err.status,
          statusText : err.data.error
        }
      });
    });
  }
}

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
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: ERROR,
        payload: err.data.error
      });
    });;    
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
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: ERROR,
        payload: err.data.error
      });
    });;    
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
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: ERROR,
        payload: err.data.error
      });
    });;
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

export const postNewGame = (data) =>{
  const endPoint = ENDPOINT_VIDEOGAME + `/videogames`;
  return (dispatch) => {
    axios.post(endPoint, data).then(({data}) => {
      return dispatch({
        type: POST_GAME,
        payload: data
      })
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: ERROR,
        payload: err.data.error
      });
    });;
  };
};

export const resetNumberPage = () => {
  return {
    type: RESET_NUMBER_PAGE,
    payload: null
  }
}

export const setFiltersRedux = (filters) => {
  return {
    type: SET_FILTERS,
    payload: filters
  }
}

export const resetNoData = () => {
  return {
    type: RESET_NO_DATA,
    payload: null
  }
}

export const resetNewdata = () => {
  return {
    type: RESET_NEW_DATA,
    payload: null}
};

