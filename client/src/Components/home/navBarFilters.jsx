import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';
import { filterGetGame, resetNumberPage, allVideogames, setFiltersRedux } from '../../dataRd/actions/index';

function FiltersNavBar(){

  const location = useLocation();
  const routerPage = useSelector((state) => state.routerPage);
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const filtersRedux = useSelector((state) => state.filters);

  const [filters, setFilters] = useState(filtersRedux);

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const handleFiltersSelect = (e) => {
    if(e.target.value === 'vacio'){     
      setFilters({...filters, [e.target.name]:null});
    }else{
      if(e.target.name === 'name' && filters.rating){
        const valNameSelect = e.target.value;
        swal({
          title: "Configuración de filtros",
          text: "When applying the filter by NAME you will lose the filter by RATING (they cannot be applied together)",
          icon: "warning",
          buttons: true,
        }).then((value) => {
          if(value){
            setFilters({...filters, name:valNameSelect, rating: null });
            setMin('');
            setMax('');
          }else{
            setFilters({...filters, name:null});
          }
        });
      }else{
        setFilters({...filters, [e.target.name]:e.target.value});
      }
    }
  };

  const resetFilters = () => {
    dispatch(setFiltersRedux({name:null, genre:null, origin:null, rating:null}));
    setMin('');
    setMax('');
    dispatch(resetNumberPage());
    dispatch(allVideogames());
  }

  const btnApplyFilters = () =>{
    var dataFilters = filters;

    if(max !== '' && min !== ''){
      dataFilters.rating = min + ',' + max;
    }else if(max !== ''){
      dataFilters.rating = min + ',0';
    }else if(min !== ''){
      dataFilters.rating = '0,' + max;
    }else{
      dataFilters.rating = null;
    };

    dispatch(resetNumberPage());
    dispatch(setFiltersRedux(dataFilters));
    dispatch(filterGetGame(dataFilters));
  };

  
  const handleFiltersInput = (e) => {
    const regex = /^\d{0,1}(\.\d{1,2})?$/;
    if(regex.test(e.target.value) && e.target.value <= 5 && e.target.value >= 0){

      if(e.target.value !== '' && filters.name){
        const valInp = (e.target.value).toString();      
        swal({
          title: "Configuración de filtros",
          text: "Applying the filter by RATING will lose the filter by NAME (can not be applied together)",
          icon: "warning",
          buttons: true,
        }).then((value) => {
          if(value){
            if(e.target.name === 'min'){
              setFilters({...filters, name:null, rating: valInp + ',' + max });            
              if(valInp === ''){
                setMin(0);
              }else{
                setMin(valInp);
              }
              if(max === ''){
                setMax(5)
              }            
            }else if(e.target.name === 'max'){
              setFilters({...filters, rating: min + ',' + valInp, name:null });
              if(valInp === ''){
                setMax(0);   
              }else{
                setMax(valInp);
              } 
              if(min === ''){
                setMin(0);
              }       
            }
          }else{
            setMin('');
            setMax('');
          };
        });
      }else{
        if(e.target.name === 'min'){
          setFilters({...filters, rating: e.target.value + ',' + max, name:null });
          setMin(e.target.value);
        }else if(e.target.name === 'max'){
          setFilters({...filters, rating: min + ',' + e.target.value, name:null });
          setMax(e.target.value);            
        }
      }
    }
    
  };

  useEffect(() => {
    if(filtersRedux.rating){
      var rating = filtersRedux.rating;
      rating = rating.split(',');
      setMin(rating[0]);
      setMax(rating[1]); 
    }
    setFilters(filtersRedux);
  }, [filtersRedux])

  

  return (<DivContentFiltesr>
    <div className="containerFilter">
      <h3>By Name</h3>
      <select name="name" id="" value={filters.name? filters.name: 'vacio'} onChange={handleFiltersSelect}>
        {<option key='nameSelectDefault' value='vacio'></option>}
        {<option key='nameUpward' value='up'>Upward</option>}
        {<option key='nameDownward' value='down'>Downward</option>}
      </select>
    </div>

    <div className="containerFilter">
      <h3>By Rating</h3>
        <div className="ratinSelect">
          <input type="number" name="min" id="" onChange={handleFiltersInput} value={min} placeholder="MIN"/>
          <input type="number" name="max" id="" onChange={handleFiltersInput} value={max} placeholder="MAX"/>
        </div>
      {/* <select name="ratin" id="">
        {<option key='ratingSelectDefault' value='vacio'></option>}
        {<option key='ratingUpward' value='upward'>Upward</option>}
        {<option key='ratingDownward' value='downward'>Downward</option>}
      </select> */}
    </div>
    
    <div className="line">

    </div>

    <div className="containerFilter">
      <h3>By Genre</h3>
      <select name="genre" id="" value={filters.genre? filters.genre: 'vacio'} onChange={handleFiltersSelect}>
      {<option key='genderSelectDefault' value='vacio'></option>}
      {genres.map( (gen) =>{
        return (
          <option key = {gen.id} value={gen.name} >
              {gen.name}
          </option>
        )
      })}
      </select>
    </div>

    <div className="containerFilter">
      <h3>By Origin</h3>
      <select name="origin" id="" value={filters.origin? filters.origin: 'vacio'} onChange={handleFiltersSelect}>
        {<option key='originSelectDefault' value='vacio'></option>}
        {<option key='originUpward' value='db'>Your Games</option>}
        {<option key='originDownward' value='raw'>Externar Game</option>}
      </select>
    </div>

    <div className="butonsFilters">
      <button onClick={btnApplyFilters}>Apply Filter(s)</button>
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
    
  </DivContentFiltesr>)

};

const DivContentFiltesr = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  transition: height 2s;
  padding: 20px 0px 10px 0px;
  width: 300px;
  height: 370px;
  background-color: rgba(255,255,255, 0.7);
  margin-top: 80px;
  margin-left: 20px;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //margin-top: 200px;
  .containerFilter{
    h3{
      margin-top: 0px;
      margin-bottom: 5px;
    }
    .line{
      width: 90%;
      height: 2px;
      border: 2px solid rgba(28, 44, 67, 0.7);
    }
    select{
      width: 150px;
      height: 30px;
      background-color: rgba(28, 44, 67, 0.9);
      margin-bottom: 25px;
      border-radius: 5px;
      padding: 2px 3px;
      color: white;      
      option{
        color: white;
      }
      &:hover{
      cursor: pointer;
      } 
    }
    .ratinSelect{
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 30px;
      gap: 5px;
      background-color: rgba(28, 44, 67, 0.9);
      color: white;
      margin-bottom: 25px;
      border-radius: 5px;
      input{
        width: 40%;
        background-color: transparent;
        font-size: 16px;
        border: none;
        color: white;
        text-align: center;
        &::placeholder {
          color: rgba(255,255,255, 0.4);
        }
      }
    }
       
  }
  .butonsFilters{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: max-content;
    justify-content: center;
    gap: 10px;
    button{
      width: 120px;
      height: 35px;
      background-color: rgba(118, 44, 44, 1);
      border-radius: 5px;
      color: white;
      font-size: 16px;
      font-family: 'Roboto';
      &:hover{
        cursor: pointer;
        background-color:  rgba(118, 44, 44, 0.6);
      }
    }
  }
  
  
`;

export default FiltersNavBar;