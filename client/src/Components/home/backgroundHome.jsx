import React from 'react';
import fondoHome from '../../assets/fondos/fondoHome.jpg';
import navBarHome from './navBar';
import styled from 'styled-components';

function BackgroundHome(){
  return (<BackgroundHomediv className='backgroundHome'>
    <img src={fondoHome} alt="FondoHome" width="100%" height="100%" />
  </BackgroundHomediv>)
};

const BackgroundHomediv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`


export default BackgroundHome;