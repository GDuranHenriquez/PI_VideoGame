import React from "react";
import styled from "styled-components";

function FiltersNavBar(){

  return (<DivContentFiltesr>
    <div className="containerFilter">
      <h3>By Name</h3>
      <select name="" id="">
        
      </select>
    </div>

    <div className="containerFilter">
      <h3>By Rating</h3>
      <select name="" id="">
        
      </select>
    </div>

    <div className="containerFilter">
      <h3>By Gender</h3>
      <select name="" id="">
        
      </select>
    </div>

    <div className="containerFilter">
      <h3>By Origin</h3>
      <select name="" id="">
        
      </select>
    </div>

    <button>Apply Filter(s)</button>

  </DivContentFiltesr>)

};

const DivContentFiltesr = styled.div`
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
  //margin-top: 200px;
  position: fixed;
  z-index: 2;
  .containerFilter{
    h3{
      margin-top: 0px;
      margin-bottom: 5px;
    }
    select{
      width: 150px;
      height: 30px;
      background-color: rgba(28, 44, 67, 0.8);
      margin-bottom: 25px;
      border-radius: 5px;
      padding: 2px 3px;
      &:hover{
      cursor: pointer;
    } 
    }
       
  }
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
  
`;

//const nameFiltersData = ['By Name', 'By Rating', 'By Gender', 'By Origin']
const optionsFilters = []

//Etiquetas y botones de filtros
const Filters = (name, options) => {
  return <div>
    <h3>{name}</h3>
    <select key={name} name={name} id={`id${name}`}>
      {options.map((opt) => {
        return <option key={opt.id} value={opt.name}>{opt.name}</option>
      })};
    </select>
  </div>
}

export default FiltersNavBar;