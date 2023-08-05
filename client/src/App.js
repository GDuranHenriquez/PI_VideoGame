import './App.css';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

//imports pages
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element= {<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
