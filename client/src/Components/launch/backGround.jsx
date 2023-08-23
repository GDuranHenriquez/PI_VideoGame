import React from 'react';
import fondoLaunc from '../../assets/fondos/launch.jpg';
import styled from 'styled-components';

function BackgroundLaunch(){
  return (<BackgroundLaunchdiv className='backgroundLaunc'>
    <img src={fondoLaunc} alt="FondoHome" width="100%" height="100%" />
  </BackgroundLaunchdiv>)
};

const BackgroundLaunchdiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  img{
    filter: brightness(40%);
  }
`


export default BackgroundLaunch;