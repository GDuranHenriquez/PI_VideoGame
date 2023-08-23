import { SEARCH_ALL_VIDEOGAME, SEARCH_ID_VIDEOGAME, SLICE_VIDEOGAME, PLATFORMS, CLEAN_DETAIL, ROUTER_PAGE, GENRES, POST_GAME, SEARCH_GAME_NAME, FILTERT_VIDEOGAME, RESET_NUMBER_PAGE, ERROR, SET_FILTERS, RESET_NO_DATA, RESET_NEW_DATA, RESET_ERROR } from '../actions/types.js';

const initialGlobalState = {
  allVideogames: null,
  detailVideoGame: [],
  videogameId: [],
  currentPage: null,
  numberPages: null,
  parentPlatforms: [],
  genres:[],
  routerPage: '',
  numberPage: 1,
  error: null,
  noData: null,
  filters: {name:null, genre:null, origin:null, rating:null},
  min:'',
  max:'',
  newData: null,
};

export default function rootReducer(state = initialGlobalState, action){
  switch (action.type) {
    case SEARCH_ALL_VIDEOGAME:
      const numberGames = action.payload.length;
      if(numberGames > 15){
        const rest = numberGames % 15;      
        const numberPages = rest > 0? parseInt((numberGames - rest)/15) + 1:parseInt((numberGames - rest)/15);
        return { ...state, allVideogames: action.payload, numberPages: numberPages, currentPage: action.payload.slice(0,15), noData:null };
      }else if(numberGames > 0){
        const numberPages = 1
        return { ...state, allVideogames: action.payload, numberPages: numberPages, currentPage: action.payload, noData:null };
      }else{
        const numberPages = 0
        return { ...state, allVideogames: [], numberPages: numberPages, currentPage: action.payload, noData: {title: 'All Videogames', message: 'No video games found'} };
      }      
    case SEARCH_GAME_NAME:
      if(action.payload.length > 0){
        return {...state, allVideogames: action.payload.slice(0,15), numberPages: 1, currentPage: action.payload.slice(0,15)}
      }else{
        return {...state, allVideogames: [], numberPages: 0, currentPage: [], noData: {title: 'Search Videogame', message: 'No video games were found matching this name'}}
      }      
    case SLICE_VIDEOGAME:
      const numberPage = action.payload * 15
      return { ...state, currentPage: state.allVideogames.slice(numberPage-15,numberPage), numberPage: action.payload}
    case PLATFORMS:
      return {...state, parentPlatforms: action.payload }
    case SEARCH_ID_VIDEOGAME:
      return { ...state, detailVideoGame: action.payload, noData:null }
    case CLEAN_DETAIL:
      return { ...state, detailVideoGame: action.payload }
    case ROUTER_PAGE:
      return { ...state, routerPage: action.payload }
    case GENRES:
      return { ...state, genres: action.payload }
    case POST_GAME:
      return { ...state, allVideogames: [action.payload, ...state.allVideogames], noData:null, newData: {title: 'Add New Game', message: 'New game successfully added'}};
    case FILTERT_VIDEOGAME:
      const numberGamesFilter = action.payload.length;
      if(numberGamesFilter > 15){
        const rest = numberGamesFilter % 15;      
        const numberPages = rest > 0? parseInt((numberGamesFilter - rest)/15) + 1:parseInt((numberGamesFilter - rest)/15);
        return { ...state, allVideogames: action.payload, numberPages: numberPages, currentPage: action.payload.slice(0,15)};
      }else if(numberGamesFilter > 0){
        const numberPages = 1
        return { ...state, allVideogames: action.payload, numberPages: numberPages, currentPage: action.payload };
      }else{
        const numberPages = 0
        return { ...state, allVideogames: [], numberPages: numberPages, currentPage: action.payload, noData: {title: 'Filters', message: 'No games were found with the specified filters'} };
      }
    case RESET_NUMBER_PAGE:
      return { ...state, numberPages: null, noData:null }
    case ERROR:
      return { ...state, error: action.payload}
    case SET_FILTERS:
      return { ...state, filters: action.payload}
    case RESET_NO_DATA:
      return { ...state, noData: null}
    case RESET_NEW_DATA:
        return { ...state, newData: null}
    case RESET_ERROR:
      return { ...state, error: null}
    default:
      return {...state};
  }
};