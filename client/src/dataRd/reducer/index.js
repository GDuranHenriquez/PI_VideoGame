import { SEARCH_ALL_VIDEOGAME, SEARCH_ID_VIDEOGAME, SLICE_VIDEOGAME, PLATFORMS, CLEAN_DETAIL, ROUTER_PAGE, GENRES, POST_GAME, SEARCH_GAME_NAME } from '../actions/types.js';

const initialGlobalState = {
  allVideogames: null,
  allVideogamesFilters: [],
  detailVideoGame: [],
  videogameId: [],
  currentPage: null,
  numberPages: null,
  parentPlatforms: [],
  genres:[],
  routerPage: '',
  numberPage: 1
};

export default function rootReducer(state = initialGlobalState, action){
  switch (action.type) {
    case SEARCH_ALL_VIDEOGAME:
      const numberGames = action.payload.length;
      if(numberGames > 15){
        const rest = numberGames % 15;      
        const numberPages = rest > 0? parseInt((numberGames - rest)/15) + 1:parseInt((numberGames - rest)/15);
        return { ...state, allVideogames: action.payload, numberPages: numberPages, currentPage: action.payload.slice(0,15)};
      }else if(numberGames > 0){
        const numberPages = 1
        return { ...state, allVideogames: action.payload, numberPages: numberPages, currentPage: action.payload };
      }else{
        const numberPages = 0
        return { ...state, allVideogames: [], numberPages: numberPages, currentPage: action.payload };
      }      
    case SEARCH_GAME_NAME:
      if(action.payload.length > 0){
        return {...state, allVideogames: action.payload.slice(0,15), numberPages: 1, currentPage: action.payload.slice(0,15)}
      }else{
        return {...state, allVideogames: [], numberPages: 0, currentPage: []}
      }      
    case SLICE_VIDEOGAME:
      const numberPage = action.payload * 15
      return { ...state, currentPage: state.allVideogames.slice(numberPage-15,numberPage), numberPage: action.payload}
    case PLATFORMS:
      return {...state, parentPlatforms: action.payload }
    case SEARCH_ID_VIDEOGAME:
      return { ...state, detailVideoGame: action.payload }
    case CLEAN_DETAIL:
      return { ...state, detailVideoGame: action.payload }
    case ROUTER_PAGE:
      return { ...state, routerPage: action.payload }
    case GENRES:
      return { ...state, genres: action.payload }
    case POST_GAME:
      return { ...state, allVideogames: [action.payload, ...state.allVideogames]}
    default:
      return {...state};
  }
};