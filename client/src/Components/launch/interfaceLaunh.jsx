import React from "react";
import { Link } from "react-router-dom";
import pressStartImg from '../../assets/icons/pressStart.png';
import pressPlay from '../../assets/icons/play.png';
import styled from "styled-components";

function InterfaceBackGround(){

  return <InterfaceLaunc>
    <div className="imgContainer">
      <img src={pressStartImg} alt="Start img" id="imgContainer"/>
      <div className="linkHome">
        <Link to='/home' className="link">
          <img src={pressPlay} alt="play" />
        {/* <input type="button" value="GET START" /> */}
        </Link>
      </div>
    </div>   
      
    </InterfaceLaunc>
}

const InterfaceLaunc = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 90vh;
  //justify-items: flex-end;
  
  .imgContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: end;
    min-height: 100%;
    width: 100%;
    margin: 0px;
    #imgContainer{
      rotate: 20deg;
      object-fit: cover;
      height: 30%;
      width: 40%;
    }
    .linkHome{
      margin: 0px;
      width: 100%;
      height: 100px;
      .link{
        img{
        width: 100px;
        height: 100px;
        }
      }    
  }
  }
  
  
`

export default InterfaceBackGround;