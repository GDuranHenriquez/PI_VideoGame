import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import logout from '../../assets/icons/logout48x48.png';
import search from '../../assets/icons/search48x48.png';
import iconFilter from '../../assets/icons/flecha48x48.png';
import FiltersNavBar from './navBarFilters';
import { useLocation, Link } from 'react-router-dom';
import detailToHome from '../../assets/icons/gif/flechaIzquierda.gif'
import agregar from '../../assets/icons/agregar.png'

function NavBarHome({paht}){
  const location = useLocation();
  const routerPage = useSelector((state) => state.routerPage);

  //const [routerPage, setRouterPage] = useState(paht);
  const [inpSearcFocus, setInpSearcFocus] = useState(false);
  const [selectFilterFocus, setSelectFilterFocus] = useState(false);

  //-----Funciones botones
  const onFocus = () => {setInpSearcFocus(true)};
  const onBlur = () => {setInpSearcFocus(false)};
  const onFocusFilter = () => {
    if(selectFilterFocus){
      setSelectFilterFocus(false)
    }else{
      setSelectFilterFocus(true)
    };
  };

  useEffect(() => {
    
  }, [])

  return <NavBar>
    <div className={`container${routerPage.includes('addgame')? ' center': ''}`}>
      
      <div className={`containerBtnFilters${routerPage.includes('home')? '': ' hidden'}`}>
      <div className="btnFilters">
        <label htmlFor="filter" onClick={onFocusFilter}>
          <span>Filter</span>
          <div className="imgFlecha">
            <img src={iconFilter}  id="filter" alt="iconFilter"  className={selectFilterFocus? 'onFocusFilter':''} />
          </div>          
        </label>
          {/* <input type="button" name='filter' className="iconFilter" onFocus={onFocusFilter} onBlur={onBlurFilter}>            
          </input> */}
      </div>      
      </div>
      <Link to='/home' className={`detailToHome${routerPage.includes('detailgame')? '': ' hidden'}`}>
          <img src={detailToHome} alt="gif back" id="detailToHome" />
      </Link>
      

      <div className={`search-logout`}>

        <div className={`inpSearch${inpSearcFocus? ' onFocus':''}${routerPage.includes('addgame')? ' hidden': ''}`}>
          <label htmlFor="textSearch" className="glassSearch">
            <img src={search} alt="Img-search" />
          </label>        
          <input type="text" name="textSearch" id="textSearch" placeholder="Write name of video game for search" onFocus={onFocus} onBlur={onBlur}/>
        </div>
        <button id="" name="BtnSearch" className={`${routerPage.includes('addgame')? ' hidden': ''}`}>Search</button>

        <Link to='/addgame' className="addGame">
          <label htmlFor="addGame" className="addGame">
            <img src={agregar} alt="icon agregar" id="addGame" />
          </label>
          <input type="button" id="addGame" name="addGame" value="Add new game" />
        </Link>

        <Link to='/' className="imgLogout">
          <img src={logout} alt="" />
        </Link >
      </div>

    </div>    
    {selectFilterFocus? <FiltersNavBar className= 'fillter'></FiltersNavBar>:''}
  </NavBar>
  
};

const NavBar = styled.div`
  .container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 80px;
    border-bottom: 2px solid rgba(122, 147, 185, 0.9);
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    
    .containerBtnFilters{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-items: center;
    margin-left: 20px;
    height: 100%;
    width: 130px;
    .btnFilters{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-items: center;
      background-color: rgba(118, 44, 44, 0.8);
      border-radius: 5px;
      height: 40px;
      width: 100%;
      label{
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Roboto';
        font-size: 15px;
        border-radius: 5px;
        color: white;
        //background-color: rgba(118, 44, 44, 1);
        width: 100%;
        height: 40px;
        &:hover{
          cursor: pointer;
          box-shadow: 0px 0px 3px 3px rgba(253, 253, 253, 0.6);
        }
        span{
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Roboto';
          background-color: transparent;
          user-select: none;
          height: 40px;
          width: 100%;
        }
        .imgFlecha{
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0 5px 5px 0px;
          height: 100%;
          width: 50px;
          background-color: rgba(217, 217, 217, .2);
          img{
            transition: 0.5s;
            height: 25px;
            width: 25px;
          }
          .onFocusFilter{
            transform: rotate(-90deg);
          }
        }
        
      }
    }
    }
    .detailToHome{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-items: center;
      margin-left: 20px;
      height: 100%;
      width: 130px;
      #detailToHome{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .search-logout{
      display: flex;
      flex-wrap: nowrap;
      height: 100%;
      width: max-content;
      align-items: center;
      gap: 20px;
      .imgLogout{
      display: flex;
      width: 50px;
      height: 50px;
      background-color: rgba(253, 253, 253, 0.5);
      border-radius: 50%;
      align-content: center;
      justify-content: center;
      margin: 0px 10px 0px 20px;
      &:hover{
        cursor: pointer;
        background-color: rgba(253, 253, 253, 0.7);
      }
      img{
        padding-top: 5px;
        height: 80%;
        width: 80%;        
      }
      }
      button{
      font-size: 16px;
      font-family: 'Roboto', sans-serif;      
      color: white;
      border-radius: 5px;
      width: 100px;
      height: 40px;
      background-color: rgba(118, 44, 44, 1);
      margin-left: 15px;
      transition: 0.3s;
      &:hover{
        cursor: pointer;
        box-shadow: 0px 0px 3px 3px rgba(253, 253, 253, 0.4);
      }
      }
      .inpSearch{
      display: flex;
      flex-wrap: nowrap;
      width: 360px;
      height: 40px;
      border-radius: 5px;
      background-color: rgba(253, 253, 253, 0.6);
      border-bottom: 2px solid rgba(122, 147, 185, 0.8);
      //transition: 0.3s;
      .glassSearch{
        display: flex;
        border-radius: 5px 0px 0px 5px;
        width: 50px;
        height: 100%;
        justify-content: center;
        align-items: center;
        img{
          width: 30px;
          height: 30px;          
        }
        
      }
      input{
        background-color: transparent;
        width: 100%;
        height: 100%;
        border: none;
        color: black;
        font-family: 'Roboto';
        font-size: 16px;
        font-weight: bold;
        padding-left: 8px;
        &:hover,
        :focus{
          border: none;
          outline: none;
        }
      }
      &:hover{
        box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.6);
      }
      }
      @keyframes parpadear {
        0% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.3);
        }
        12% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.4);
        }
        24% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.5);
        }
        50% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.6);
        }
        62% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.7);
        }
        74% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.6);
        }
        86% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.5);
        }
        100% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.4);
        }
        /* 0% {
          box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.0);
        } */
      }
      .addGame{
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        width: max-content;
        height: 40px;
        background-color: rgba(253, 253, 253, 0.6);
        border-radius: 5px;
        padding: 0px 3px 0px 3px ;
        text-decoration: none;
        label{
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: transparent;
          img{
            width: 24px;
            height: 24px;
          }
          &:hover{
            cursor: pointer;
          }
        }
        input{
          background-color: transparent;
          border: none;
          font-size: 16px;
          font-weight: bold;
          &:hover{
            cursor: pointer;
          }
        }
                
      }
      .hidden{
      display: none;
    }
         
    .onFocus{
      
      animation: parpadear 2s infinite;
      //box-shadow: 0px 6px 3px 0px rgba(253, 253, 253, 0.6);
    }
    }
    .hidden{
      display: none;
    }
  }
  .center{
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  } 
  
`;

export default NavBarHome;