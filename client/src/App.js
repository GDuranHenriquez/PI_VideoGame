import './App.css';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBarHome from './Components/home/navBar';
import { useDispatch } from "react-redux";
import { allVideogames, getPlatForms, setRouter, cleanDetail, getGenres } from "./dataRd/actions/index.js";
//imports pages
import Home from './pages/home';
import DetailGame from './pages/detailGame'
import NewGame from './pages/newGame';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(allVideogames());
    dispatch(getPlatForms());
    dispatch(getGenres())
    dispatch(setRouter(location.pathname));
    dispatch(cleanDetail())
  },[]);

  return (
    <div className="App">
      {(location.pathname !== '/') ? (<NavBarHome paht={location.pathname}></NavBarHome>):null}
      <Routes>
        <Route path='/home' element= {<Home></Home>}></Route>
        <Route path='/detailgame/:id' element = {<DetailGame></DetailGame>}></Route>
        <Route path='/addgame' element={<NewGame></NewGame>}></Route>
      </Routes>
    </div>
  );
}


export default App;
